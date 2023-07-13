import { ref } from '@nuxtjs/composition-api';
import { useVSFContext } from '@vue-storefront/core';
import { Context } from '@vue-storefront/core';

const useCountySearch = (): any => {
  const context: Context = useVSFContext();
  const counties = ref<Array<string>>([]);
  const towns = ref<Array<any>>([]);
  const villages = ref<Array<any>>([]);
  const agents = ref<Array<any>>([]);

  const search = async (): Promise<void> => {
    const { data } = await context.$odoo.api.getCounties();

    counties.value = data.counties
  }

  const searchTowns = async (county: string): Promise<void> => {
    if (!county) return;
    
    const params: any = {
      county
    }

    const { data } = await context.$odoo.api.getTowns(params);

    towns.value = data.towns;
  }

  const searchVillages = async (townId: number): Promise<void> => {
    if (!townId) return;

    const params: any = {
      town: townId
    };

    const { data } = await context.$odoo.api.getVillages(params);

    villages.value = data.villages;
  }

  const searchAgents = async (townId: number): Promise<void> => {
    if (!townId) return;

    const params: any = {
      town: townId
    };

    const { data } = await context.$odoo.api.getAgents(params);

    agents.value = data.agents;
  }

  return {
    counties,
    towns,
    villages,
    agents,
    search,
    searchTowns,
    searchVillages,
    searchAgents,
  }
}

export default useCountySearch;