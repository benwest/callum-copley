<?php

return [
  "bvdputte.kirbyqueue.queues" => [
    "pdf_to_images" => function ($job) {
      $id = $job->get('id');
      $file = kirby()->file($id);
      $path = $file->root();
      $dir = dirname($path);
      $page_count = PDFToImage::getPageCount($path);
      $pagesQueue = kqQueue('pdf_page_to_image');
      foreach (range(0, $page_count - 1) as $i) {
        $name = $file -> name();
        $num = str_pad($i, 5, '0', STR_PAD_LEFT);
        $outFile = $dir . DIRECTORY_SEPARATOR . "{$name}_{$num}.jpg";
        $job = kqJob([
          'inFile' => $path,
          'page' => $i,
          'outFile' => $outFile
        ]);
        $pagesQueue->addJob($job);
      }
    },
    "pdf_page_to_image" => function ($job) {
      $inFile = $job->get('inFile');
      $page = $job->get('page');
      $outFile = $job->get('outFile');
      PDFToImage::pageToImage($inFile, $page, $outFile);
    }
  ]
];