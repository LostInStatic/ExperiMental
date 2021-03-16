import APIURLS from './apiUrls';
import fetchJSON from './fetchJSON';
import { IAPIExperiments } from './interfaces/experiments';
import addAPIParameters, { TIdsOrAll } from './parameters';

export interface IExperimentsData {
	id: string,
	name: string,
	ingredientIds: string[],
	intro: string,
	steps: string[],
	explanationDelay: number,
	explanation: string,
	references: string

}


const fetchExperiments = async (
	ids: TIdsOrAll
): Promise<IExperimentsData[]> => {
	const dataObject = await fetchJSON<IAPIExperiments>(
		APIURLS.experiments + addAPIParameters({
			specificIds: ids
		})
	);
	console.log(APIURLS.experiments + addAPIParameters({
		specificIds: ids
	}));
	let experiments = dataObject.data.map(experiment => {
		return {
			id: experiment.id,
			name: experiment.attributes.title,
			ingredientIds: experiment.relationships.field_skladniki.data.map(data => data.id),
			intro: experiment.attributes.field_wstep.processed,
			steps: experiment.attributes.field_instrukcja,
			explanationDelay: experiment.attributes.field_opoznienie_wyjasnienia,
			explanation: experiment.attributes.field_wyjasnienie.processed,
			references: experiment.attributes.field_odnosniki?.processed

		};
	});
	return experiments;
};

export default fetchExperiments;
