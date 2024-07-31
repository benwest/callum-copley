<?php

class PDFToImage {
  static function getPageCount ( $path ) {
    return (int) exec( "identify -format %N $path" );
  }
  static function pageToImage (string $inFile, int $page, string $outFile) {
    $cmd = "convert -density 150 '$inFile'[$page] -quality 80 -sharpen 0x1.0 $outFile";
    self::execOrThrow( $cmd );
  }
  private static function execOrThrow(string $cmd) {
    $proc = proc_open( $cmd, [
      1 => [ 'pipe','w' ],
      2 => [ 'pipe','w' ]
    ], $pipes );
    $stdout = stream_get_contents( $pipes[ 1 ] );
    $stderr = stream_get_contents( $pipes[ 2 ] );
    if ( strlen( $stderr ) > 0 ) throw new Error( "Error from command: $cmd\n$stderr" );
    return $stdout;
  }
}

Kirby::plugin("bewe/pdf", [
  "hooks" => [
    "file.create:after" => function ($file) {
      if ($file->extension() === "pdf") {
        $queue = kqQueue('pdf_to_images');
        $job = kqJob([ 'id' => $file->id() ]);
        $queue->addJob($job);
      }
    },
    "file.replace:after" => function ($file) {
      if ($file->extension() === "pdf") {
        $queue = kqQueue('pdf_to_images');
        $job = kqJob([ 'id' => $file->id() ]);
        $queue->addJob($job);
      }
    },
    "file.update:after" => function ($file) {
      if ($file->extension() === "pdf") {
        $queue = kqQueue('pdf_to_images');
        $job = kqJob([ 'id' => $file->id() ]);
        $queue->addJob($job);
      }
    }
  ]
]);
