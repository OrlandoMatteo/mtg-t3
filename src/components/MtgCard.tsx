import symbols from "../utils/symbology.json";
import { api } from "../utils/api";
import { map } from "@trpc/server/observable";
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

function getBackground(cardColors: Array<string> = [""]): Object {
	const colors: { [key: string]: string } = {
		U: "blue-200",
		W: "yellow-50",
		R: "red-300",
		B: "slate-300",
		G: "green-300",
	};
	let output = { startGradient: 'slate-300', endGradient: 'slate-400' }
	if (cardColors.length == 1) {
		output.startGradient = colors[cardColors[0]] || "slate-400";
		output.endGradient = colors[cardColors[0]] || "slate-300";
	} else if (cardColors.length == 2) {
		output.startGradient = colors[cardColors[0]] || "slate-300";
		output.endGradient = colors[cardColors[1]] || "slate-400";
	}

	return output
}
export default function MtgCard() {
	const card = api.card.randomCard.useQuery()
	const colors = getBackground(card.data?.colors) ?? { startGradient: 'slate-500', endGradient: 'slate-400' }
	return (
		<div className={" bg-gradient-to-r from-" +
			colors.startGradient + " to-" + colors.endGradient + " w-11/12 md:w-1/3 m-auto py-1 border-solid border-slate-700 border-4 rounded-lg h-[80vh] flex flex-col"}  >
			<div className="flex flex-row w-10/12 m-auto rounded-lg my-4 shadow-inner shadow-2xl p-2">
				<h1 className="text-black text-xl font-bold basis-5/6">
					{card.data?.name}
				</h1>
				{getSymbolsSVG(card.data?.manaCost).map((uri) => <img className="w-6" src={uri} />)}
			</div>
		</div>


	);


}
