import APIURLS from './apiUrls';
import fetchJSON from './fetchJSON';
import { IAPIExperiments } from './interfaces/experiments';
import addAPIParameters, { TIdsOrAll } from './parameters';
import alterOutgoingLinks from './alterOutgoingLinks';

export interface IExperimentsData {
	id: string,
	name: string,
	ingredientIds: string[],
	intro: string,
	steps: string[],
	explanationDelay: number,
	explanation: string,
	references: string
	backgroundImageUrl: string
}


const fetchExperiments = async (
	ids: TIdsOrAll
): Promise<IExperimentsData[]> => {
	const dataObject = await fetchJSON<IAPIExperiments>(
		APIURLS.experiments + addAPIParameters({
			specificIds: ids,
			includeBackgroundPhoto: true
		})
	);
	const experiments = dataObject.data.map(experiment => {
		return {
			id: experiment.id,
			name: experiment.title,
			ingredientIds: experiment.field_skladniki.map(data => data.id),
			intro: alterOutgoingLinks(experiment.field_wstep.processed),
			steps: experiment.field_instrukcja,
			explanationDelay: experiment.field_opoznienie_wyjasnienia,
			explanation: alterOutgoingLinks(experiment.field_wyjasnienie.processed),
			references: alterOutgoingLinks(experiment.field_odnosniki?.processed),
			backgroundImageUrl: experiment.field_tlo_tytulu.uri?.url

		};
	});
	return experiments;
};

export default fetchExperiments;


