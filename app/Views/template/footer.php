<footer>
    <!-- FOOTER CONTENT HERE -->

    <p>Patrycja Hańdziuk // <?=date('Y')?></p> 
</footer>

<script src="<?= base_url('js/libs/bootstrap.min.js'); ?>"></script>
<script src="<?= base_url('js/libs/lazyload.min.js'); ?>"></script>
<script src="<?= base_url('js/libs/cookieconsent.min.js'); ?>"></script>
<script type="module" src="https://cdn.jsdelivr.net/npm/@justinribeiro/lite-youtube@1.1.0/lite-youtube.js"></script>
<script src="<?= base_url('js/basic.js'); ?>"></script>

<?php if ($page == 'kup-bilet') : ?>
    <script src="<?= base_url('js/libs/axios.min.js'); ?>"></script>
    <script src="<?= base_url('js/libs/vue.js'); ?>"></script>
    <script src="<?= base_url('js/libs/vue-dragscroll.min.js'); ?>"></script>   
<?php endif; ?>
<?php if (isset($additional_js) && !empty($additional_js)) { foreach ($additional_js as $tag) { echo $tag; } } ?>

</body>
</html>