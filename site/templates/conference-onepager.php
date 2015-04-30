<?php snippet('head') ?>

<body> 
	<div class="container">
		<?php snippet('header') ?>
		<div class="content slide">
			<section class="about">
				<p><?php echo $page->text() ?></p>
			</section>
			<?php snippet('schedule') ?>
			<?php snippet('location') ?>
		</div>
	</div>
</body>
</html>
