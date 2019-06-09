import Total from './Total.svelte';
import TopFlop from './TopFlop.svelte';
import BigMuseums from './BigMuseums.svelte';
import topFlopData from './topFlop.json';
import totalData from './total.json';
import bigMuseumsData from './bigMuseums.json';
import { tsvParse } from 'd3-dsv';

/**
 * Function that determines the language of the swissinfo site the app runs in
 */
const getLang = () => {
	if (typeof window === 'undefined' || !window.location) return;
	let matches = window.location.href.match(/^https:\/\/(?:www\.)?swissinfo\.ch\/([a-z]{3})/);
	if (matches && matches.length > 1) return matches[1];
	// or is it in the cms?
	matches = window.location.href.match(/^https:\/\/studio\.silium.ch\/blueprint\/servlet\/page\/([a-z]{3})/);
	if (matches && matches.length > 1) return matches[1];
	// or maybe rts?
	if (window.location.href.match(/^https:\/\/(?:www\.)?rts\.ch/)) {
		return 'fre';
	}
	// fallback value
	return 'ger';
};

// copy and paste tables from google spreadsheets into the backticks:
const strings = tsvParse(`message-code	ger	eng	fre	ita	spa	por	jpn	chi	rus	ara
total_title	Nur ein Viertel aller Einzelausstellungen in der Schweiz ist Frauen gewidmet	Only a quarter of solo exhibitions in Switzerland feature women artists	Un quart seulement des expositions individuelles en Suisse sont consacrées à des aristes féminines	Solo un quarto di tutte le mostre personali in Svizzera sono dedicate alle donne	Solo una cuarta parte de todas las exposiciones individuales en Suiza están dedicadas a mujeres	Apenas um quarto de todas as exposições individuais na Suíça são dedicadas às mulheres	スイスで開かれた単独展のうち、女性芸術家に焦点を当てたのは4展に1展だけ	在瑞士，仅有四分之一的个览展出的是女性艺术家作品	Только четверть всех персональных выставок в Швейцарии посвящена женщинам	في سويسرا، فقط ربع المعارض الفردية مخصصة للنساء
total_description	Anteil an Ausstellungen in 80 Schweizer Kunstmuseen	Percentage of exhibitions in 80 Swiss art museums	Pourcentage dans les expositions dans 80 musées d'art suisses	Percentuale nelle mostre di 80 musei d'arte svizzeri	Proporción en exposiciones en 80 museos de arte suizos	Proporção de exposições em 80 museus de arte na Suíça	スイスの80美術館が開いた展示会に占める割合（％）	在瑞士80家美术馆展览中所占比例	Доля выставок во всех 80 швейцарских художественных музеях	نسبة المعرض في 80 متحفا فنيا في سويسرا
f	Frauen	Women	Femmes	Donne	Mujeres	Mulheres	女性	女性	Женщины	النساء
m	Männer	Men	Hommes	Uomini	Hombres	Homens	男性	男性	Мужчины	الرجال
total_remarks	*Datengrundlage und Methodik: Link am Ende des Artikels	Data and methodology: see link at end of story	*Base de données et méthode: suivre le lien à la fin de l'article	*Base di dati e metodologia: vedi link alla fine dell'articolo	*Base de datos y metodología: ver enlace al final del artículo	*Base de dados e metodologia: clique no link no final do artigo	調査方法：記事本文の末尾参照	*数据及调查方法：链接请见文章最后	* База данных и методология: ссылка в конце статьи	* قاعدة البيانات والمنهجية: انظر الرابط في آخر النص
single	Einzelausstellungen	Solo exhibitions	Expositions individuelles	Mostre individuali	Exposiciones individuales	Exposições individuais	単独展	个人作品展览	Персональные выставки	معارض فردية
group	Gruppenausstellungen	Group exhibitions	Expositions collectives	Mostre collettive	Exposiciones colectivas	Exposições coletivas	テーマ展	联合作品展览	Групповые выставки	معارض جماعية
topflop_title	Grosse Unterschiede zwischen den Museen	Significant differences between museums	Grandes différences selon les musées	Differenze significative tra i musei	Grandes diferencias entre los museos	Grandes diferenças entre os museus	美術館ごとに大きな違いがある	美术馆之间的差异显著	Значительные различия между музеями	اختلافات كبيرة بين المتاحف
topflop_description	Die 5 Museen mit dem höchsten und tiefsten Frauenanteil in Einzelausstellungen	The five museums with the highest and lowest levels of female representation in solo exhibitions	Les 5 musées présentant la plus forte et la plus faible part de femmes dans les expositions individuelles	I 5 musei con la più alta e più bassa percentuale di donne nelle mostre individuali	Los 5 museos con la proporción de mujeres en exposiciones individuales más alta y más baja	Os cinco museus com a maior e menos proporção de mulheres em exposições individuais	女性芸術家の単独展数トップ＆ワースト5位	女性艺术家个人作品展比例最高及最低的5家美术馆	Пять музеев с наиболее высокой и наиболее низкой долей женщин на персональных выставках	المتاحف الخمسة التي تسجّل أعلى نسبة وأقلّ نسبة للنساء بالنسبة للمعارض الفردية
bigmuseums_title	Meistbesuchte Museen schneiden schlecht ab	The most-visited museums perform poorly	Les musées les plus visités accordent peu de place aux femmes	I musei più visitati danno poco spazio alle donne	Los museos más visitados sacan malas notas	Os museus mais visitados na Suíça têm os piores resultados	訪問者数が最も多い美術館は不成績	参观者最多的美术馆女性艺术家个展比例较低	Самые посещаемые музеи показывают худшие результаты	المتاحف الأكثر زيارة تحتفظ بأدنى النتائج
bigmuseums_description	Anteil an Einzelausstellungen in den grössten Schweizer Kunstmuseen	Percentage of solo exhibitions in the largest Swiss art museums	Part aux expositions individuelles dans les plus grands musées d'art suisses	Percentuale di mostre personali nei maggiori musei d'arte svizzeri	Proporción en exposiciones individuales en los principales museos de arte suizos 	Proporção de exposições individuais nos principais museus de arte da Suíça	スイスの大きな美術館が開いた単独展に占める割合（％）	瑞士最大美术馆的女性艺术家个展比例	Доля персональных выставок в крупнейших швейцарских художественных музеях	نسبة المعارض الفردية في أكبر المتاحف الثقافية في سويسرا
source	Quelle: Eigene Recherche	Source: individual research	Source: propre recherche	Fonte: ricerca propria	Fuente: investigación propia	Fonte: pesquisa própria	出典：自社調査	来源：自行调研		المصدر: بحث ذاتي
Château de Chillon					Castillo de Chillon		シヨン城			قصر شيّون 
Kunstmuseum Bern					Museo de Arte de Berna		ベルン美術館			متحف الفن في برن 
Fondation Beyeler					Fundación Beyeler		バイエラー財団			مؤسسة بايلير 
Kunsthaus Zürich					Casa de Arte de Zúrich		チューリヒ美術館			دار الفن في زيورخ
Kunstmuseum Basel					Museo de Arte de Basilea		バーゼル美術館			متحف الفن في بازل 
Zentrum Paul Klee					Zentrum Paul Klee		パウルクレー・センター			مركز بول كلي 
Musée d'art et d'histoire					Museo de Arte y de Historia		美術歴史博物館			متحف الفن والتاريخ
Musée Alexis Forel					Museo Alexis Forel		アレクシ・フォレル博物館			متحف ألكسيس فوريل 
Museum Nairs					Museo Nairs		スイス国立博物館			متحف نايرس 
Kunsthalle Basel					Sala de Arte de Basilea		クンストハレ・バーゼル			رواق الفن في بازل 
Centre d'art Pasquart					Centro de Arte Pasquart		パスクアートセンター			مركز الفن باسكوارت 
Kunsthaus Grenchen					Casa de Arte de Grenchen		グレンヒェン美術館			دار الفن في غرينشين 
Musée d'art et d'histoire					Museo de Arte e Historia		美術・歴史博物館			متحف الفن والتاريخ
Maison Tavel					Casa Tavel		タヴェル館			دار تافيل 
Musée Rath					Museo Rath		ラース美術館			متحف "رات" 
Museum Oskar Reinhart					Museo Oskar Reinhart		オスカー・ラインハルト美術館			متحف أوسكار راينهارت 
Pinacoteca comunale					Pinacoteca comunal		市立美術館			معرض الصور البلدي 
Basel					Basilea		バーゼル			بازل 
Bern					Berna		ベルン			برن 
Biel							ビール/ビエンヌ			بيل/بيان
Genève					Ginebra		ジュネーブ			جنيف 
Grenchen							グレンヒェン			غرينشين
Locarno							ロカルノ			لوكارنو
Morges							モルジュ			مُورج 
Riehen							リーエン			ريهن
Scuol							シュクオール			سكوول 
Veytaux/Montreux							ヴェトー/モントルー			فايتو/مونترو
Winterthur							ヴィンタートゥール			فينترتور
Zürich					Zúrich		チューリヒ			زيورخ`);

// define what language to use
const lang = getLang();

/**
 * Function that translates messages into the language defined above
 * @param {string} messageCode what message to translate
 */
const t = (messageCode) => {
	const result = strings.find((d) => d['message-code'] === messageCode);
	if (result && result.hasOwnProperty(lang) && result[lang]) {
		return result[lang];
	} else {
		return messageCode;
	}
};

/**
 * Additional shared information like colors
 */
const colors = {
	f: '#9b6cdd',
	m: '#65d4a2'
};

/**
 * Export first app: Total numbers
 */
export const total = new Total({
	target: document.querySelector('#total'),
	props: {
		data: totalData,
		colors,
		t
	}
});

/**
 * Export second app: Top and Flop 5
 */
export const topflop = new TopFlop({
	target: document.querySelector('#topflop'),
	props: {
		data: topFlopData,
		colors,
		t
	}
});

/**
 * Export third app: Big museums
 */
export const bigMuseums = new BigMuseums({
	target: document.querySelector('#bigmuseums'),
	props: {
		data: bigMuseumsData,
		colors,
		t
	}
});
