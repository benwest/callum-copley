<?php snippet('header') ?>

<?php
  $data = [
    'title' => (string) $site -> title(),
    'firstName' => (string) $site -> firstName(),
    'lastName' => (string) $site -> lastName(),
    'byline' => (string) $site -> byline(),
    'email' => (string) $site -> email()
  ];
  $projects = [];
  foreach ( page('projects') -> children() -> listed() as $project ) {
    $pages = [];
    foreach ( $project -> files() -> filterBy( 'type', 'image' ) as $file ) {
      $pages []= [
        'large' => $file -> url(),
        'small' => $file -> thumb( $file, [ 'width' => $file -> width() / 8 ] ) -> url(),
        'size' => [ $file -> width(), $file -> height() ]
      ];
    }
    $projects[] = [
      'title' => (string) $project -> title(),
      'slug' => (string) $project -> slug(),
      'format' => (string) $project -> format(),
      'year' => (string) $project -> year(),
      'description' => (string) $project -> description() -> kirbytext(),
      'pages' => $pages
    ];

  }
  $data[ 'projects' ] = $projects;
?>
<script id="content" type="text/json"><?= json_encode( $data ) ?></script>

<main></main>

<div class="cursor">
  <div class="cursor__top"></div>
  <div class="cursor__bottom"></div>
  <div class="cursor__left"></div>
  <div class="cursor__right"></div>
</div>

<?php snippet('footer') ?>