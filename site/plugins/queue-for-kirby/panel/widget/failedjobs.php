<?php

if(!panel()->user()->isAdmin()) return false;

$jobs_count = queue::jobs()->count();

// Don't show the Widget if there are no failed jobs,
// but DO display it if there are more than 5 jobs piled up
// to remind the user there is a queue at all
// if(!queue::failedJobs()->count() and queue::$current_job == null and $jobs_count === 0) return false;

return
[
  'title' => [
    'text' => 'Jobs',
    'compressed' => false
  ],
  'options' => [
    [
      'text' =>
        ($jobs_count == 1 ? '1 job' : $jobs_count . ' jobs')
        . ' waiting',
      'icon' => 'square-o',
      'link' => 'queue/work'
    ],
    // [
    //   'text' => 'Flush all',
    //   'icon' => 'trash-o',
    //   'link' => 'queue/flush'
    // ]

  ],
  'html' => function() {
    $curr = queue::$current_job;
    $failed = queue::failedJobs();
    $jobs = queue::jobs();

    // if (!$failed->count()) return 'No failed jobs.';

    return tpl::load(__DIR__ . DS . 'failedjobs.html.php', compact('curr', 'failed', 'jobs'));
  }
];