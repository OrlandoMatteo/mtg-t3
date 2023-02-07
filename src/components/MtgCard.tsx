import symbols from "../utils/symbology.json";
import { api } from "../utils/api";
function getSymbolsSVG(manaCost: string): Array<string> {
	let symbolURLs: Array<string> = [];
	const extractedArray:Array<string> = manaCost?.match(/\{[^}]+\}/g)||[''];
	extractedArray.forEach((symbol) => {
	let symbolinfo = symbols.data.find((x) => x.symbol == symbol) || {
		svg_uri: "",
	};
	symbolURLs.push(symbolinfo.svg_uri);
});
	return symbolURLs
}
export default function MtgCard(): JSX.Element {
	const card = api.card.randomCard.useQuery()
	//	const imgResponse = api.card.imageSrc.useQuery({ 'src': card.data?.identifiers?.scryfallOracleId! })
	//	const url = "https://api.scryfall.com/cards/" + imgResponse.data?.identifiers.scryfallId + "?format=json"
	//	const res = await fetch(url)
	//	const data = await res.json()
	//	console.log(imgResponse.data)
	//	const uri = data.info.image_uris.art_crop
	const manaCost = card.data?.manaCost
	const extractedArray = manaCost?.match(/\{[^}]+\}/g);
	console.log("manaCost")
	console.log(card.data?.name)
	//let symbolURLs: Array<string> = [];
	//Array.from(extractedArray).forEach((symbol) => {
	//	let symbolinfo = symbols.data.find((x) => x.symbol == symbol) || {
	//		svg_uri: "",
	//	};
	//	symbolURLs.push(symbolinfo.svg_uri);
	//});
	//const cardColors: Array<string> = card.data?.colors || ["B"]
	//const colors: { [key: string]: string } = {
	//	U: "#c1d7e9",
	//	W: "#f8f6d8",
	//	R: "#e49977",
	//	B: "#cac5c0",
	//	G: "#a3c095",
	//};
	//let monoColor = "slate";
	//let startGradient = "slate";
	//let endGradient = "slate";
	//let isSingle = true;
	//if (cardColors.length == 1) {
	//	monoColor = colors[cardColors[0]] || "slate";
	//} else if (cardColors.length == 2) {
	//	isSingle = false;
	//	startGradient = colors[cardColors[0]];
	//	endGradient = colors[cardColors[1]];
	//}
	return (<div><div>{card.data?.name}</div>
		{getSymbolsSVG(card.data?.manaCost).map((uri)=><img class="w-6" src={uri}/>)}</div>);



}
