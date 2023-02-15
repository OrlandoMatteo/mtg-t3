import symbols from "../utils/symbology.json";
import { api } from "../utils/api";
import { map } from "@trpc/server/observable";
import { cards } from "@prisma/client";
function getSymbolsSVG(manaCost: string): Array<string> {
	let symbolURLs: Array<string> = [];
	const extractedArray: Array<string> = manaCost?.match(/\{[^}]+\}/g) || [''];
	extractedArray.forEach((symbol) => {
		let symbolinfo = symbols.data.find((x) => x.symbol == symbol) || {
			svg_uri: "",
		};
		symbolURLs.push(symbolinfo.svg_uri);
	});
	return symbolURLs
}

function getBackground(cardColors: Array<string> = [""]) {
	const colors: { [key: string]: string } = {
		U: "blue-400",
		W: "yellow-50",
		R: "red-500",
		B: "slate-600",
		G: "green-400",
	};
	let output = { startGradient: 'from-slate-300', viaGradient: '', endGradient: '' }
	if (cardColors.length == 1) {
		output.startGradient = "from-" + colors[cardColors[0]] || "from-slate-400";
		output.viaGradient = "";
		output.endGradient = "";
	} else if (cardColors.length == 2) {
		output.startGradient = "from-" + colors[cardColors[0]] || "slate-300";
		output.viaGradient = "";
		output.endGradient = "to-" + colors[cardColors[1]] || "slate-400";
	} else if (cardColors.length == 3) {
		output.startGradient = "from-" + colors[cardColors[0]] || "slate-300";
		output.viaGradient = "via-" + colors[cardColors[1]] || "slate-400";
		output.endGradient = "to-" + colors[cardColors[2]] || "slate-400";
	} else if (cardColors.length > 3) {
		output.startGradient = "from-amber-400";
		output.viaGradient = "";
		output.endGradient = "";
	}
	return output
}

export default function MtgCard({ card }: any): JSX.Element {
	return (
		<div className={` bg-gradient-to-br ${getBackground(card.data?.colors).startGradient} ${getBackground(card.data?.colors).endGradient} sm:w-96 w-11/12 m-auto py-1 border-solid border-slate-700 border-4 rounded-lg h-[80vh] flex flex-col`}  >
			<div className="flex flex-row w-10/12 m-auto rounded-lg my-4 shadow-2xl p-2  border-solid border border-slate-400">
				<h1 className="text-black text-xl font-bold basis-5/6">
					{card.data?.name}
				</h1>
				{getSymbolsSVG(card.data?.manaCost).map((uri) => <img className="w-6" src={uri} />)}
			</div>
			<div><img src="https://picsum.photos/300/200" className="m-auto w-10/12 rounded-lg" /></div>
			<div><h3 className="font-bold m-auto my-2 w-10/12 rounded-lg shadow-2xl p-2 border-solid border border-slate-400">{card.data?.type}</h3></div>
			<div className="m-auto my-2 w-10/12 rounded-lg shadow-2xl p-2 h-fit flex-1 border-solid border border-slate-400">{card.data?.text}</div>
			{card.data?.power && <div className="m-auto my-2 w-10/12 rounded-lg shadow-2xl p-2 border-solid border border-slate-400 justify-end flex">
				<span className="text-2xl font-bold">{card.data?.power}</span >
				<span className="text-2xl font-bold">/</span>
				<span className="text-2xl font-bold">{card.data?.toughness}</span >
			</div>}
		</div>
	);
}

