export function BaseHTML({
	children,
	title,
}: { children: any; title: string }) {
	return (
		<html lang="en">
			<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>{title}</title>
				<script src="https://cdn.tailwindcss.com" />
				<script src="https://unpkg.com/htmx.org@1.9.12" />
			</head>
			<body class={'overflow-hidden transition-all'}>
				<Nav />
				{children}
			</body>
		</html>
	);
}

export function Nav() {
	return (
		<>
			<div class={"w-screen h-[5%] bg-zinc-400 flex justify-between"}>
				<a href="/">[HomePage]</a>
				<a href="/cars">[Cars]</a>
			</div>
			<hr class={"border-black border-[1px]"} />
		</>
	);
}
