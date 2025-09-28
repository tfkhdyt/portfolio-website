<script lang="ts">
	let { pageTitle, pageDescription, origin, siteName, author = 'Taufik Hidayat' } = $props();

	const imageUrl = $derived(`${origin}/portrait.jpg`);
	const robotsUrl = $derived(`${origin}/robots.txt`);
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
	<meta
		name="keywords"
		content="Taufik Hidayat, Taufik Hidayat Dev, Taufik Dev, Hidayat Dev, Taufik Hidayat Developer, Taufik Developer, Hidayat Developer, Taufik Hidayat Full Stack, Taufik Hidayat Backend, Taufik Full Stack, Taufik Backend, Hidayat Full Stack, Hidayat Backend, Full Stack Developer, TypeScript Developer, Node.js Developer, React Developer, Svelte Developer, Golang Developer, Web Application Developer, Software Engineer, JavaScript Developer, Backend Developer, Frontend Development, Backend Development, Full Stack Web Development, Modern Web Development, JavaScript Frameworks, Web Application Architecture, REST API Development, GraphQL Developer, Microservices Development, Cross-Platform Development, Agile Development, Cloud-Native Applications, Real-Time Applications, Scalable Web Applications, High-Performance Web Apps, Full Stack Developer with TypeScript and Node.js, React and Svelte Expert for Web Projects, Golang Backend Developer for Scalable Applications, Hire Full Stack Developer for TypeScript Projects, Build Modern Web Apps with React and Node.js, TypeScript and Golang Developer for Backend Systems, Svelte Framework Developer for Lightweight Applications, Experienced Developer in React, Node.js, and Golang, Full Stack Developer Specializing in Microservices, Web Developer Proficient in TypeScript and Svelte, Custom Web Solutions with React and TypeScript, Develop REST APIs with Node.js and Golang, Real-Time Web Applications Using Node.js and Svelte, Full Stack Developer for Enterprise-Level Applications, Hire Developer for Scalable Backend Systems in Golang, Full Stack Developer in Bandung, Indonesia, TypeScript Developer in Bandung, Indonesia, Node.js Developer Near Me, React Developer Jobs in Bandung, Indonesia, Golang Developer for Remote Work, E-commerce Web Developer, Fintech Full Stack Developer, Healthcare Application Developer, EdTech Web Application Developer, SaaS Platform Developer, Taufik Software Developer"
	/>
	<meta property="og:image" content={imageUrl} />
	<meta name="twitter:image" content={imageUrl} />
	<meta name="twitter:image:alt" content="Taufik Hidayat's Portrait" />
	<meta name="author" content={author} />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={pageDescription} />
	<meta property="og:url" content={origin} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={siteName} />
	<meta property="og:locale" content="en_US" />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:description" content={pageDescription} />
	<meta name="twitter:card" content="summary_large_image" />
	<link rel="canonical" href={origin} />
	<meta name="application-name" content={siteName} />
	<meta name="generator" content="SvelteKit" />
	<meta name="license" content="MIT" />
	<meta name="color-scheme" content="dark" />
	<meta name="theme-color" content="#13111C" />
	<meta name="format-detection" content="telephone=no" />
	<link rel="robots" href={robotsUrl} />
</svelte:head>
