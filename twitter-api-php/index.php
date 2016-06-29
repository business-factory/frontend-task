<?php
ini_set('display_errors', 1);
require_once('TwitterAPIExchange.php');

/** Set access tokens here - see: https://dev.twitter.com/apps/ **/
$settings = array(
  'oauth_access_token' => "370190091-1WuJEBfGciKwKn3bg0ygWmNa0VhDUF2XiR5nYeQK",
  'oauth_access_token_secret' => "fIPVh2RUPINrmidNvjBpwuyos14cjT0IvYz1kRngTzaHm",
  'consumer_key' => "jPs0eIaJXwZsEcLTfLit5AnU4",
  'consumer_secret' => "rV5gk58dL41L8HKVZFjAqjYr54nXcdzHvabRWOtncy5qwfVDpB"
);

// Query parameters
$q = isset($_GET['q']) ? $_GET['q'] : '' ; 
$page = isset($_GET['page']) ? 'page='.$_GET['page'] : '' ; 
$count = isset($_GET['count']) ? 'count='.$_GET['count'] : '' ; 
$includeEntities = isset($_GET['include_entities']) ? 'include_entities='.$_GET['include_entities'] : '' ;

$url = 'https://api.twitter.com/1.1/users/search.json';
$requestMethod = 'GET';
$getfield = sprintf('?=%s%s%s%s', $q, $page, $count, $includeEntities);

$twitter = new TwitterAPIExchange($settings);
echo $response = $twitter->setGetfield($getfield)
  ->buildOauth($url, $requestMethod)
  ->performRequest();