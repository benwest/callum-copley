<?php

kirby()->plugin('queue-for-kirby');

function PDF_length ( $path ) {
    return (int) exec( "identify -format %n $path" );
}

function execOrThrow ( $cmd ) {
    $proc = proc_open( $cmd, [
        1 => [ 'pipe','w' ],
        2 => [ 'pipe','w' ]
    ], $pipes );
    $stdout = stream_get_contents( $pipes[ 1 ] );
    $stderr = stream_get_contents( $pipes[ 2 ] );
    if ( strlen( $stderr ) > 0 ) throw new Error( "Error from command: $cmd\n$stderr" );
    return $stdout;
}

queue::define( 'pdf_to_image', function( $job ) {
    $uri = $job->get( 'uri' );
    $pageName = dirname( $uri );
    $filename = basename( $uri );
    $file = page( $pageName ) -> file( $filename );
    $dir = kirby() -> roots() -> content() . DS . dirname( $file -> diruri() );
    $path = $dir . DS . $file -> filename();
    $outURLs = [];
    $length = PDF_length( $path ) - 1;
    foreach ( range( 0, $length ) as $i ) {
        echo "$filename $i / $length" . PHP_EOL;
        $outFile = $file -> name() . '_' . str_pad( $i, 5, '0', STR_PAD_LEFT ) . '.jpg';
        $outURL = dirname( $file -> url() ) . DS . $outFile;
        $outPath = $dir . DS . $outFile;
        $cmd = "convert -density 150 '" . $path . "'[" . $i . "] -quality 80 -sharpen 0x1.0 $outPath";
        echo $cmd . PHP_EOL;
        execOrThrow( $cmd );
        array_push( $outURLs, $outURL );
    }
    $file -> update([
        'pdfPages' => yaml::encode( $outURLs )
    ]);
    
    // $inFile = $job->get('inFile');
    // $outFile = $job->get('outFile');
    // $density = $job->get('density');
    // $cmd = "convert -density $density $inFile -quality 80 -sharpen 0x1.0 $outFile";
    // // print_r( $cmd );
    // echo $cmd . PHP_EOL;
    // $proc = proc_open( $cmd,[
    //     1 => ['pipe','w'],
    //     2 => ['pipe','w'],
    // ], $pipes );
    // echo 'after proc' . PHP_EOL;
    // $stdout = stream_get_contents( $pipes[1] );
    // echo 'after stdout' . PHP_EOL;
    // var_dump( $stdout );
    // // fclose( $pipes[1] );
    // $stderr = stream_get_contents( $pipes[2] );
    // echo 'after stderr' . PHP_EOL;
    // var_dump( $stderr );
    // // fclose( $pipes[2] ); 
    // $return_value = proc_close( $proc );
    // echo 'after return' . PHP_EOL;
    // var_dump( $return_value );
    // print_r( $return_value );
    // print_r( $stderr );
});

// function PDF_length ( $file ) {
//     return (int) exec( "identify -format %n $file" );
// }

kirby() -> hook(['panel.file.upload','panel.file.replace','panel.file.update'], function( $file ){
    if ( $file -> extension() === 'pdf' ) {
        // $length = PDF_length( $file );
        // $file -> update([
            
        // ]);
        // foreach ( range( 0, $length ) as $page ) {
        //     $outFile = $dir . DS . join([
        //         $file -> filename(),
        //         $file -> date(),
        //         (string) $page,
        //         (string) $density
        //     ], '_' ) . '.jpg';
        // }
        queue::add('pdf_to_image', [
            'uri' => $file -> uri(),
            'description' => 'Converting ' . $file -> filename()
        ]);
    }
});

// function PDF_length ( $file ) {
//     return (int) exec( "identify -format %n $file" );
// }

// function PDF_filename ( $file, $page, $density ) {
//     return 'pdf' . DS . join([
//         $file -> filename(),
//         $file -> date(),
//         (string) $page,
//         (string) $density
//     ], '_' ) . '.jpg';
// }

// function PDF_to_image ( $file, $page, $density ) {
//     $dir = 'pdf';
//     if( !is_dir( $dir ) ) mkdir( $dir, 0755, true );
//     $inFile = $file -> dir() . DS . $file-> filename();
//     $outFile = $dir . DS . join([
//         $file -> filename(),
//         $file -> date(),
//         (string) $page,
//         (string) $density
//     ], '_' ) . '.jpg';
//     if ( !file_exists( $outFile ) ) {
//         copy( 'site/plugins/pdf/default.jpg', $outFile );
//         queue::add('pdf_to_image', [
//             'inFile' => $inFile,
//             'outFile' => $outFile,
//             'density' => $density
//         ]);
//     }
//     return new Media ( $outFile, $outFile );
// }