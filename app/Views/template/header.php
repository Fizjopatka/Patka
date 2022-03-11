<!doctype html>
<html lang="pl">
<head>
    <?= $this->include('/gtm/top'); ?>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta property="og:title" content="<?= $title;?>" />
    <meta property="og:description" content="<?= $description;?>"/>
    <meta property="og:type" content="website" />
    <meta property="og:url" content="<?= base_url(); ?>" />
    <meta property="og:image" content="<?= base_url(); ?>/images/og-image.png" />
    <meta name="description" content="<?= $description;?>">
    <title><?= $title;?></title>

    <link rel="icon" href="<?= base_url(); ?>/favicon.ico" type="image/x-icon"/>
    <link rel="apple-touch-icon" sizes="180x180" href="<?= base_url(); ?>/apple-touch-icon.png">

    <link rel="stylesheet" type="text/css" href="<?= base_url('css/basic.css'); ?>">
    <link rel="stylesheet" type="text/css" href="<?= base_url('css/libs/ab_lazy_load.css'); ?>">
    <link rel="stylesheet" type="text/css" href="<?= base_url('css/libs/bootstrap.min.css'); ?>">
    <link rel="stylesheet" type="text/css" href="<?= base_url('css/libs/a_cookieconsent.min.css'); ?>">
    <link href="https://fonts.googleapis.com/css2?family=Teko&display=swap" rel="stylesheet">
    <?php if (isset($additional_css) && !empty($additional_css)) { foreach ($additional_css as $tag) { echo $tag; } } ?>
</head>
<body class="<?= $page; ?>">
    <?= $this->include('/gtm/bottom'); ?>
<header>
    <?php // INCLUDE RIGHT MENU ?>
    <?php echo $this->include('/template/menu'); ?>
</header>