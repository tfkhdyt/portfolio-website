<script lang="ts">
	import JsonContent from './JsonContent.svelte';
	import ResumeHeader from './ResumeHeader.svelte';

	let {
		isMaximized,
		copied,
		formattedJson,
		copyToClipboard,
		toggleMaximize
	}: {
		isMaximized: boolean;
		copied: boolean;
		formattedJson: string;
		copyToClipboard: () => void;
		toggleMaximize: () => void;
	} = $props();

	let offsetX = $state(0);
	let offsetY = $state(0);
	let savedOffsetX = $state(0);
	let savedOffsetY = $state(0);
	let startX = $state(0);
	let startY = $state(0);
	let cardRef: HTMLDivElement | undefined = $state();

	let transitioning = $state(false);

	function onToggle() {
		transitioning = true;
		if (isMaximized) {
			toggleMaximize();
			offsetX = savedOffsetX;
			offsetY = savedOffsetY;
		} else {
			savedOffsetX = offsetX;
			savedOffsetY = offsetY;
			toggleMaximize();
			requestAnimationFrame(() => {
				offsetX = 0;
				offsetY = 0;
			});
		}
		setTimeout(() => (transitioning = false), 350);
	}

	function clamp(x: number, y: number, el: HTMLElement) {
		const rect = el.getBoundingClientRect();
		const minVisible = 40;
		const topReveal = 0;
		const natL = rect.left - offsetX;
		const natR = rect.right - offsetX;
		const natT = rect.top - offsetY;
		const natB = rect.bottom - offsetY;
		x = Math.max(minVisible - natR, Math.min(window.innerWidth - minVisible - natL, x));
		y = Math.max(
			minVisible - natB,
			-topReveal - natT,
			Math.min(window.innerHeight - minVisible - natT, y)
		);
		return { x, y };
	}

	function handlePointerDown(e: PointerEvent) {
		if (isMaximized) return;
		startX = e.clientX - offsetX;
		startY = e.clientY - offsetY;
		(e.target as HTMLElement).setPointerCapture(e.pointerId);

		function handlePointerMove(e: PointerEvent) {
			if (!cardRef) return;
			const clamped = clamp(e.clientX - startX, e.clientY - startY, cardRef);
			offsetX = clamped.x;
			offsetY = clamped.y;
		}

		function handlePointerUp() {
			document.removeEventListener('pointermove', handlePointerMove);
			document.removeEventListener('pointerup', handlePointerUp);
		}

		document.addEventListener('pointermove', handlePointerMove);
		document.addEventListener('pointerup', handlePointerUp);
	}
</script>

<div
	bind:this={cardRef}
	class={`animate-in fixed z-50 transition-none duration-300 md:ease-in-out ${transitioning ? 'md:transition-[inset,margin,transform] md:duration-300' : 'md:transition-[inset,margin] md:duration-300'} ${isMaximized ? 'inset-0 md:inset-8' : 'inset-[5%] mt-44 md:inset-[20%] md:mt-8 xl:inset-[25%] xl:-mt-24'}`}
	style={`transform: translate(${offsetX}px, ${offsetY}px)`}
>
	<div
		class={`relative overflow-hidden border border-white/[3%] bg-white/[4%] shadow-2xl shadow-black/20 backdrop-blur-none transition-none duration-300 ease-in-out md:rounded-2xl md:backdrop-blur-2xl md:transition-all ${isMaximized ? 'h-full rounded-none' : 'h-[50vh] rounded-2xl md:h-[50vh] xl:h-[70vh]'}`}
	>
		<div class="relative z-10 flex h-full flex-col">
			<!-- Card Header -->
			<ResumeHeader
				{copied}
				{isMaximized}
				{copyToClipboard}
				toggleMaximize={onToggle}
				onpointerdown={handlePointerDown}
			/>

			<!-- JSON Content -->
			<JsonContent {formattedJson} />
		</div>
	</div>
</div>
