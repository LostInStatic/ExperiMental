import APIURLS from'./apiUrls';
import getData from './getData';
import { Experiments } from './interfaces/experiments';

export interface IExperimentsData {
	id: string,
	name: string,
	ingredientIds: string[],
	intro: string,
	steps: string[],
	explanationDelay: number,
	explanation: string

}


const getExperiments = async ():Promise<IExperimentsData[]> => {
	let experiments = getData<Experiments>(APIURLS.experiments).then(data => {
		try {
			let experiments = data.data.map(experiment => {
				return {
					id: experiment.id,
					name: experiment.attributes.title,
					ingredientIds: experiment.relationships.field_skladniki.data.map(data => data.id),
					intro: experiment.attributes.field_wstep.processed,
					steps: experiment.attributes.field_instrukcja,
					explanationDelay: experiment.attributes.field_opoznienie_wyjasnienia,
					explanation: experiment.attributes.field_wyjasnienie.processed

				};
			});
			if (experiments.length === 0) {
				throw 'experiments empty!';
			}
			return experiments;
		} catch (error) {
			console.error('Invalid experiments list, check API!', error);
		}
	});

	return experiments;
};
export default getExperiments;
