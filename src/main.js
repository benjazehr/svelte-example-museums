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
	if (typeof window === 'undefined' || !window.hasOwnProperty('location')) return;
	const matches = window.location.href.match(/^https:\/\/(?:www\.)?swissinfo\.ch\/([a-z]{3})/);
	if (matches && matches.length > 1) return matches[1];
	// or maybe rts?
	if (window.location.href.match(/^https:\/\/(?:www\.)?rts\.ch/)) {
		return 'fre';
	}
	// fallback value
	return 'ger';
};

// copy and paste tables from google spreadsheets into the backticks:
const strings = tsvParse(`message-code	ger	eng	fre	ita	esp	por	jpn	chi	rus	ara
total_title	Nur ein Viertel aller Einzelausstellungen in der Schweiz ist Frauen gewidmet	Only a quarter of solo exhibitions in Switzerland feature women artists			Solo una cuarta parte de todas las exposiciones individuales en Suiza están dedicadas a mujeres	Apenas um quarto de todas as exposições individuais na Suíça são dedicadas às mulheres		在瑞士，仅有四分之一的个览展出的是女性艺术家作品	Только четверть всех персональных выставок в Швейцарии посвящена женщинам	في سويسرا، فقط ربع المعارض الفردية مخصصة للنساء
total_description	Anteil an Ausstellungen in 80 Schweizer Kunstmuseen	Percentage of exhibitions in 80 Swiss art museums			Proporción en exposiciones en 80 museos de arte suizos	Proporção de exposições em 80 museus de arte na Suíça		在瑞士80家美术馆展览中所占比例	Доля выставок во всех 80 швейцарских художественных музеях	نسبة المعرض في 80 متحفا فنيا في سويسرا
f	Frauen	Women			Mujeres	Mulheres		女性	Женщины	النساء
m	Männer	Men			Hombres	Homens		男性	Мужчины	الرجال
total_remarks	*Datengrundlage und Methodik: Link am Ende des Artikels	Data and methodology: see link at end of story			*Base de datos y metodología: ver enlace al final del artículo	*Base de dados e metodologia: clique no link no final do artigo		*数据及调查方法：链接请见文章最后	* База данных и методология: ссылка в конце статьи	* قاعدة البيانات والمنهجية: رابط في آخر النص
single	Einzelausstellungen	Solo exhibitions			Exposiciones individuales	Exposições individuais		个人作品展览	Персональные выставки	معارض فردية
group	Gruppenausstellungen	Group exhibitions			Exposiciones colectivas	Exposições coletivas		联合作品展览	Групповые выставки	معارض جماعية
topflop_title	Grosse Unterschiede zwischen den Museen	Significant differences between museums			Grandes diferencias entre los museos	Grandes diferenças entre os museus		美术馆之间的差异显著	Значительные различия между музеями	اختلافات كبيرة بين المتاحف
topflop_description	Die 5 Museen mit dem höchstem und tiefsten Frauenanteil in Einzelausstellungen	The five museums with the highest and lowest levels of female representation in solo exhibitions			Los 5 museos con la proporción de mujeres en exposiciones individuales más alta y más baja	Os cinco museus com a maior e menos proporção de mulheres em exposições individuais		女性艺术家个人作品展比例最高及最低的5家美术馆	Пять музеев с наиболее высокой и наиболее низкой долей женщин на персональных выставках	المتاحف الخمسة التي تسجّل أعلى نسبة وأقلّ نسبة للنساء بالنسبة للمعارض الفردية
bigmuseums_title	Meistbesuchte Museen schneiden schlecht ab	The most-visited museums perform poorly			Los museos más visitados sacan malas notas	Os museus mais visitados na Suíça têm os piores resultados		参观者最多的美术馆女性艺术家个展比例较低	Самые посещаемые музеи показывают худшие результаты	المتاحف الأكثر زيارة تحتفظ بأدنى النتائج
bigmuseums_description	Anteil an Einzelausstellungen in den grössten Schweizer Kunstmuseen	Percentage of solo exhibitions in the largest Swiss art museums			Proporción en exposiciones individuales en los principales museos de arte suizos 	Proporção de exposições individuais nos principais museus de arte da Suíça		瑞士最大美术馆的女性艺术家个展比例	Доля персональных выставок в крупнейших швейцарских художественных музеях	نسبة المعارض الفردية في أكبر المتاحف الثقافية في سويسرا
source	Quelle: Eigene Recherche	Source: individual research			Fuente: investigación propia	Fonte: pesquisa própria		来源：自行调研		المصدر: بحث ذاتي`);

// define what language to use
const lang = getLang();

/**
 * Function that translates messages into the language defined above
 * @param {string} messageCode what message to translate
 */
const t = (messageCode) => {
	const result = strings.find((d) => d['message-code'] === messageCode);
	if (result && result.hasOwnProperty(lang)) {
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
