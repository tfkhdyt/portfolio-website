<script lang="ts">
	// Import resume.json
	import resumeJson from '$lib/assets/resume.json';
	import BackgroundGlows from '$lib/components/BackgroundGlows.svelte';
	import ResumeCard from '$lib/components/ResumeCard.svelte';

	let { data } = $props();

	// Constants
	const pageTitle = 'Taufik Hidayat - Full Stack Developer';
	const pageDescription =
		'Full Stack Developer with proven track record in crafting modern web solutions using TypeScript, Svelte, and Golang. Experienced in building high-impact applications including AI-powered financial analysis systems, multilingual project management marketing page, and optimized ticketing systems with improved performance. Distinguished Informatics Engineering graduate with multiple academic awards and a portfolio of successful open-source projects ranging from developer tools to web applications. Seeking challenging opportunities to create innovative, scalable software solutions that deliver measurable business value.';
	const siteName = "Taufik Hidayat's Portfolio";

	// States
	let copied = $state(false);
	let isMaximized = $state(false);

	// Format JSON data
	function formatJson<T>(jsonData: T) {
		return JSON.stringify(jsonData, null, 2);
	}

	let formattedJson = $derived(formatJson(resumeJson));

	// Functions
	function copyToClipboard() {
		navigator.clipboard.writeText(formattedJson);
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}

	function toggleMaximize() {
		isMaximized = !isMaximized;
	}
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
	<meta
		name="keywords"
		content="Taufik Hidayat, Taufik Hidayat Dev, Taufik Dev, Hidayat Dev, Taufik Hidayat Developer, Taufik Developer, Hidayat Developer, Taufik Hidayat Full Stack, Taufik Hidayat Backend, Taufik Full Stack, Taufik Backend, Hidayat Full Stack, Hidayat Backend, Full Stack Developer, TypeScript Developer, Node.js Developer, React Developer, Svelte Developer, Golang Developer, Web Application Developer, Software Engineer, JavaScript Developer, Backend Developer, Frontend Development, Backend Development, Full Stack Web Development, Modern Web Development, JavaScript Frameworks, Web Application Architecture, REST API Development, GraphQL Developer, Microservices Development, Cross-Platform Development, Agile Development, Cloud-Native Applications, Real-Time Applications, Scalable Web Applications, High-Performance Web Apps, Full Stack Developer with TypeScript and Node.js, React and Svelte Expert for Web Projects, Golang Backend Developer for Scalable Applications, Hire Full Stack Developer for TypeScript Projects, Build Modern Web Apps with React and Node.js, TypeScript and Golang Developer for Backend Systems, Svelte Framework Developer for Lightweight Applications, Experienced Developer in React, Node.js, and Golang, Full Stack Developer Specializing in Microservices, Web Developer Proficient in TypeScript and Svelte, Custom Web Solutions with React and TypeScript, Develop REST APIs with Node.js and Golang, Real-Time Web Applications Using Node.js and Svelte, Full Stack Developer for Enterprise-Level Applications, Hire Developer for Scalable Backend Systems in Golang, Full Stack Developer in Bandung, Indonesia, TypeScript Developer in Bandung, Indonesia, Node.js Developer Near Me, React Developer Jobs in Bandung, Indonesia, Golang Developer for Remote Work, E-commerce Web Developer, Fintech Full Stack Developer, Healthcare Application Developer, EdTech Web Application Developer, SaaS Platform Developer"
	/>
	<meta property="og:image" content="{data.origin}/logo.jpg" />
	<meta name="twitter:image" content="{data.origin}/logo.jpg" />
	<meta name="twitter:image:alt" content="Taufik Hidayat's Logo" />
	<meta name="author" content="Taufik Hidayat" />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={pageDescription} />
	<meta property="og:url" content={data.origin} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={siteName} />
	<meta property="og:locale" content="en_US" />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:description" content={pageDescription} />
	<meta name="twitter:card" content="summary_large_image" />
	<link rel="canonical" href={data.origin} />
	<meta name="application-name" content={siteName} />
	<meta name="generator" content="SvelteKit" />
	<meta name="license" content="MIT" />
	<meta name="color-scheme" content="dark" />
	<meta name="theme-color" content="#13111C" />
	<meta name="format-detection" content="telephone=no" />
	<link rel="robots" href="{data.origin}/robots.txt" />
</svelte:head>

<main
	class="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#13111C] md:p-4"
>
	<!-- Background glows -->
	<BackgroundGlows />

	<!-- Content -->
	<ResumeCard {isMaximized} {copied} {formattedJson} {copyToClipboard} {toggleMaximize} />
</main>
