<template>
  <div>
    <!-- begin: Select on the map Modal -->
    <SfModal
      :visible="isMapModalOpen"
      @close="toggleMapModal"
    >
      <div class="flex flex-wrap flex-col lg:flex-row gap-4 lg:gap-10">
        <h3 class="pt-3">Select delivery location</h3>
        <div class="smartphone-only">
          <GMap
            ref="gMap"
            language="en"
            :center="{lat: 44.933076, lng: 15.629058}"
            :options="{fullscreenControl: false}"
            :zoom="6"
          >
            <!-- <GMapMarker
              v-for="location in locations"
              :key="location.id"
              :position="{lat: location.lat, lng: location.lng}"
              :options="{icon: location === currentLocation ? pins.selected : pins.notSelected}"
              @click="currentLocation = location"
            >
              <GMapInfoWindow :options="{maxWidth: 200}">
                <code>
                  lat: {{ location.lat }},
                  lng: {{ location.lng }}
                </code>
              </GMapInfoWindow>
            </GMapMarker>
            <GMapCircle :options="circleOptions"/> -->
          </GMap>
        </div>
        <ValidationObserver v-slot="{ handleSubmit, invalid }" class="flex-1">
          <form @submit.prevent="handleSubmit(handleSearchAgent)"
            class="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-10"
          >
            <ValidationProvider
              name="county"
              rules="required"
              v-slot="{ errors }"
              slim
              class=""
            >
              <SfSelect
                v-model="agentForm.county"
                label="County"
                name="county"
                class="sf-select--underlined"
                required
                :valid="!errors[0]"
                :errorMessage="errors[0]"
              >
                <SfSelectOption
                  v-for="county in counties"
                  :key="county"
                  :value="county"
                >
                  {{ county }}
                </SfSelectOption>
              </SfSelect>
            </ValidationProvider>
      
            <ValidationProvider
              name="town"
              rules="required"
              v-slot="{ errors }"
              slim
            >
              <SfSelect
                v-model="agentForm.townId"
                label="City/Town"
                name="town"
                class="sf-select--underlined"
                required
                :valid="!errors[0]"
                :errorMessage="errors[0]"
              >
                <SfSelectOption
                  v-for="town in towns"
                  :key="town.id"
                  :value="town.id"
                >
                  {{ town.town }}
                </SfSelectOption>
              </SfSelect>
            </ValidationProvider>
      
            <ValidationProvider
              name="village"
              rules="required"
              v-slot="{ errors }"
              slim
            >
              <SfSelect
                v-model="agentForm.villageId"
                label="Village"
                name="village"
                class="sf-select--underlined"
                required
                :valid="!errors[0]"
                :errorMessage="errors[0]"
              >
                <SfSelectOption
                  v-for="village in villages"
                  :key="village.id"
                  :value="village.id"
                >
                  {{ village.village }}
                </SfSelectOption>
              </SfSelect>
            </ValidationProvider>
                  
            <CopiaButton
              type="submit"
              :disabled="invalid"
              class="self-start justify-self-start lg:w-auto w-full"
            >
              {{ $t('Select') }}
            </CopiaButton>
          </form>
        </ValidationObserver>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-8">
        <div class="agency-results pr-0 lg:pr-2">
          <h6 class="font-medium">
            Stores found: <span class="font-bold">{{ mock_agency_lists.length }}</span>
          </h6>
          <ul>      
            <li
              v-for="(agency, index) in mock_agency_lists"
              :key="index"
            >
              <div class="agency-item relative"
                @click="selectAgent(index)"
              >
                <span class="smartphone-only">{{ `${agency.distance}km away from you` }}</span>
                <div class="flex flex-wrap gap-3">
                  <SfImage
                    :src="addBasePath('/checkout/agency_img.png')"
                    :width="107"
                    :height="142"
                    :alt="agency.name"
                    class="flex-none"
                  />
                  <div class="flex justify-between flex-1">
                    <div class="store-info">
                      <p class="store-info-header">
                        {{ $t('Store name') }}
                      </p>
                      <p class="mt-4 store-name">
                        {{ agency.name }}
                      </p>
                      <div class="flex items-center gap-3 mt-3">
                        <SfIcon
                          icon="phone"
                          color="red-primary"
                          size="xs"
                        />
                        <span class="">0709 339 000</span>
                      </div>
                      <div class="flex items-center gap-3 mt-3">
                        <SfIcon
                          icon="mail"
                          color="red-primary"
                          size="xs"
                        />
                        <span class="">example@email.com</span>
                      </div>
                    </div>
                    <SfCircleIcon
                      v-if="agentId === index"
                      icon="check"
                      iconSize="lg"
                      class="w-8 h-8 absolute bottom-4 right-4 smartphone-only"
                    />
                    <div class="flex flex-col items-end gap-10 desktop-only">
                      <span class="store-distance">
                        {{ `${agency.distance}km away from you` }}
                      </span>
                      <SfCircleIcon
                        v-if="agentId === index"
                        icon="check"
                        iconSize="lg"
                        class="w-8 h-8"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="desktop-only">
          <GMap
            ref="gMap"
            language="en"
            :center="{lat: 44.933076, lng: 15.629058}"
            :options="{fullscreenControl: false}"
            :zoom="6"
          >
            <!-- <GMapMarker
              v-for="location in locations"
              :key="location.id"
              :position="{lat: location.lat, lng: location.lng}"
              :options="{icon: location === currentLocation ? pins.selected : pins.notSelected}"
              @click="currentLocation = location"
            >
              <GMapInfoWindow :options="{maxWidth: 200}">
                <code>
                  lat: {{ location.lat }},
                  lng: {{ location.lng }}
                </code>
              </GMapInfoWindow>
            </GMapMarker>
            <GMapCircle :options="circleOptions"/> -->
          </GMap>
        </div>
      </div>
    </SfModal>
    <!-- end: Select on the map Modal -->

    <!-- begin: Delivery section -->
    <SfHeading
      :level="3"
      :title="$t('Delivery')"
      class="sf-heading--left my-10"
    />
    <div class="grid lg:grid-cols-2 grid-cols-1 gap-5 pb-10">
      <BoxTab
        :title="$t('Deliver to me')"
        :content="$t('Please select the nearest agent to facilitate easy and quick delivery of the goods')"
        :active="isDeliverToMe"
        @click="setDeliverToMe(true)"
      />
      <BoxTab
        :title="$t('Deliver to someone else')"
        :content="$t('Please select the nearest agent to facilitate easy and quick delivery of the goods')"
        :active="!isDeliverToMe"
        @click="setDeliverToMe(false)"
      />

    </div>

    <SfHeading
      :level="3"
      :title="$t('Details about to deliver to someone else')"
      class="sf-heading--left mb-10"
      :class="{ 'hidden': isDeliverToMe }"
    />

    <!-- begin: Deliver Form -->
    <ValidationObserver ref="destinationFormRef">
      <form
        :class="{ 'hidden': isDeliverToMe }"
      >
        <div class="form">
          <ValidationProvider
            name="nameOfPerson"
            rules="required"
            v-slot="{ errors }"
            slim
          >
            <SfInput
              label="Name of person who's going to receive your goods"
              name="nameOfPerson"
              v-model="destinationForm.name"
              :valid="!errors[0]"
              :errorMessage="errors[0]"
              class="mb-3"
            />
          </ValidationProvider>
  
          <ValidationProvider
            name="phoneOfPerson"
            rules="required"
            v-slot="{ errors }"
            slim
          >
            <SfInput
              v-model="destinationForm.phone"
              label="Phone number of the person who's going to receive your goods"
              name="phoneOfPerson"
              :valid="!errors[0]"
              :errorMessage="errors[0]"
              class="mb-8"
            />
          </ValidationProvider>
  
          <ValidationProvider
            name="destinationComments"
          >
            <SfTextarea
              label="Additional Comments(Optional)"
              name="destinationComments"
              class="mb-10"
              :rows="5"
              :value="destinationForm.comment"
            />
          </ValidationProvider>
        </div>
      </form>
  
    </ValidationObserver>
    <!-- end: Delivery Form -->
    <!-- end: Delivery section -->
    
    <!-- begin: Select nearest agent section -->
    <div class="flex justify-between my-10">
      <SfHeading
        :level="3"
        :title="$t('Select nearest agent')"
        class="sf-heading--left"
      />
      <SfButton
        class="sf-button--pure flex items-center underline h-fit"
        @click="toggleMapModal"
      >
        <SfIcon
          icon="marker"
          size="sm"
          class="lg:mr-2 mr-1"
        />
        {{ $t('Select on map') }}
      </SfButton>
    </div>
    <div class="grid lg:grid-cols-2 grid-cols-1 gap-5">
      <BoxTab
        v-for="(agent, index) in mock_agents"
        :key="index"
        :active="index === activeAgent"
        @click="selectNearestAgent(index)"
      >
        <template #content>
          <div class="text-left">
            <p>{{ agent.county }}</p>
            <p>{{ agent.city }}</p>
            <p>{{ agent.village }}</p>
          </div>
        </template>
      </BoxTab>
    </div>

    <!-- begin: Agent Form -->
    <ValidationObserver ref="agentFormRef">
      <form>      
        <CopiaButton
          type="submit"
          color="Grey"
          class="my-10"
        >
          {{ $t('Add new nearest agent') }}
        </CopiaButton>
        <ValidationProvider
          name="county"
          rules="required"
          v-slot="{ errors }"
          slim
        >
          <SfSelect
            v-model="agentForm.county"
            label="County"
            name="county"
            class="sf-select--underlined mb-3"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          >
            <SfSelectOption
              v-for="(county, index) in counties"
              :key="index"
              :value="county"
            >
              {{ county }}
            </SfSelectOption>
          </SfSelect>
        </ValidationProvider>
  
        <ValidationProvider
          name="city"
          rules="required"
          v-slot="{ errors, validate }"
          slim
        >
          <SfSelect
            v-model="agentForm.townId"
            label="City/Town"
            name="city"
            class="sf-select--underlined mb-3"
            required
            @change="validate"
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          >
            <SfSelectOption
              v-for="town in towns"
              :key="town.id"
              :value="town.id"
            >
              {{ town.town }}
            </SfSelectOption>
          </SfSelect>
        </ValidationProvider>
  
        <ValidationProvider
          name="village"
          rules="required"
          v-slot="{ errors }"
          slim
        >
          <SfSelect
            v-model="agentForm.villageId"
            label="Village"
            name="village"
            class="sf-select--underlined mb-3"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          >
            <SfSelectOption
              v-for="village in villages"
              :key="village.id"
              :value="village.id"
            >
              {{ village.village }}
            </SfSelectOption>
          </SfSelect>
        </ValidationProvider>
  
        <ValidationProvider
          name="agentId"
          rules="required"
          v-slot="{ errors }"
          slim
        >
          <SfSelect
            v-model="agentForm.agentId"
            label="Agent"
            name="agentId"
            class="sf-select--underlined mb-8"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          >
            <SfSelectOption
              v-for="agent in agents"
              :key="agent.id"
              :value="agent.id"
            >
              {{ agent.id }}
            </SfSelectOption>
          </SfSelect>
        </ValidationProvider>
  
        <ValidationProvider
          name="agentComments"
        >
          <SfTextarea
            label="Additional Comments(Optional)"
            name="agentComments"
            class="mb-4"
            :rows="5"
            :value="agentForm.comment"
          />
        </ValidationProvider>
        
      </form>
    </ValidationObserver>
    <!-- end: Agent Form -->
    <!-- end: Select nearest agent section -->

    <CopiaButton
      color="Red"
      class="desktop-only"
      @click="handleContinueToPayment"
      :disabled="loading"
    >
      <!-- <SfLoader :class="{ loader: loading }" :loading="loading" class="w-full"> -->
        <div>
          {{ $t('Continue to payment') }}
        </div>
      <!-- </SfLoader> -->
    </CopiaButton>
    <div class="footer fixed z-10 bottom-0 left-0 right-0 smartphone-only bg-white w-full p-4">
      <CopiaButton
        color="Red"
        class="sf-button--full-width"
        @click="handleContinueToPayment"
      >
        <!-- <SfLoader :class="{ loader: loading }" :loading="loading"> -->
          <div>
            {{ $t('Continue to payment') }}
          </div>
        <!-- </SfLoader> -->
      </CopiaButton>      
    </div>
   </div> 
</template>

<script>
import {
  SfHeading,
  SfInput,
  SfButton,
  SfSelect,
  SfRadio,
  SfCheckbox,
  SfIcon,
  SfTextarea,
  SfModal,
  SfImage,
  SfLoader
} from '@storefront-ui/vue';
import BoxTab from '~/components/Checkout/BoxTab.vue';
import { ref, reactive, onMounted, watch, defineComponent } from '@nuxtjs/composition-api';
import { onSSR, addBasePath } from '@vue-storefront/core';
import CopiaButton from '~/components/Core/Atoms/CopiaButton.vue';
import {
  useCart
} from '@vue-storefront/odoo';
import { useCheckout, useCountySearch } from '~/composables';
import { required, min, digits } from 'vee-validate/dist/rules';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';

extend('required', {
  ...required,
  message: 'This field is required'
});
extend('min', {
  ...min,
  message: 'The field should have at least {length} characters'
});
extend('digits', {
  ...digits,
  message: 'Please provide a valid phone number'
});

export default {
  name: 'Delivery',
  components: {
    SfHeading,
    SfInput,
    SfButton,
    SfSelect,
    SfRadio,
    SfIcon,
    SfCheckbox,
    SfModal,
    SfImage,
    SfTextarea,
    SfLoader,
    ValidationProvider,
    ValidationObserver,
    BoxTab,
    CopiaButton
},
  setup(props, { root }) {
    const { cart, load: loadCart } = useCart();
    const {
      order,
      error,
      isDeliverToMe,
      setDeliverToMe,
      loading,
      setAddress,
    } = useCheckout();
    const {
      counties,
      towns,
      villages,
      agents,
      search,
      searchTowns,
      searchVillages,
      searchAgents
    } = useCountySearch();

    const isMapModalOpen = ref(false);
    const sameAsShipping = ref(false);
    const activeAgent = ref(0);
    const firstName = ref(null);
    const lastName = ref(null);
    const phone = ref(null);
    const agentId = ref(null);
    const destinationFormRef = ref(null);
    const agentFormRef = ref(null);
    const agentForm = ref({
      county: '',
      townId: null,
      villageId: null,
      agentId: null,
      comment: ''
    });
    const destinationForm = reactive({
      name: '',
      phone: '',
      comment: ''
    });
    const mock_agents = ref([
      {
        county: 'Name of the County',
        city: 'Name of the City/Town',
        village: 'Name of the Village',
      },
      {
        county: 'Name of the County',
        city: 'Name of the City/Town',
        village: 'Name of the Village',
      },
    ]);
    const mock_agency_lists =  ref([
      {
        name: "Zielinskiego 40, 20C, Wroclaw",
        phone: "0709 339 000",
        email: "example@email.com",
        image: "/checkout/agancy_item.png",
        distance: 2
      },
      {
        name: "Zielinskiego 40, 20C, Wroclaw",
        phone: "0709 339 000",
        email: "example@email.com",
        image: "/checkout/agancy_item.png",
        distance: 2
      },
      {
        name: "Zielinskiego 40, 20C, Wroclaw",
        phone: "0709 339 000",
        email: "example@email.com",
        image: "/checkout/agancy_item.png",
        distance: 2
      },
      {
        name: "Zielinskiego 40, 20C, Wroclaw",
        phone: "0709 339 000",
        email: "example@email.com",
        image: "/checkout/agancy_item.png",
        distance: 2
      },
    ]);

    const selectNearestAgent = (index) => {
      activeAgent.value = index;
    }

    const handleAgentFormSubmit = async () => {
      return;
    };

    const handleSearchAgent = async () => {
      return;
    }

    const handleContinueToPayment = async () => {
      if (await agentFormRef.value.validate()) {
        if (isDeliverToMe.value) {
          firstName.value = cart.value.order.customerId.firstName;
          lastName.value = cart.value.order.customerId.lastName;
          phone.value = cart.value.order.customerId.phone || cart.value.order.customerId.email;

          await setAddress({
            remoteCustomer: { firstName: firstName.value, lastName: lastName.value, emailPhone: phone.value },
            receivingAgentId: parseInt(agentForm.value.agentId)
          });
          
          if (!error.setAddress) root.$router.push('/checkout/payment');
        } else {
          if (destinationFormRef.value.validate()) {
            firstName.value = destinationForm.name.split(' ')[0];
            lastName.value = destinationForm.name.split(' ')[1];
            phone.value = destinationForm.phone;

            await setAddress({
              remoteCustomer: { firstName: firstName.value, lastName: lastName.value, emailPhone: phone.value },
              receivingAgentId: parseInt(agentForm.value.agentId)
            });

            if (!error.setAddress) root.$router.push('/checkout/payment');
          }
        }
      }
    }

    const toggleMapModal = () => {
      isMapModalOpen.value = !isMapModalOpen.value;
    }

    const selectAgent = (index) => {
      agentId.value = index;
    }

    onMounted(async () => {
      await loadCart({ customQuery: { cartLoad: 'copiaCartLoad' }});
      console.log('cart/order/customerId:', cart.value.order.customerId);
      await search();
      if (counties) agentForm.value.county = null;
    });
    
    watch(
      () => agentForm?.value?.county,
      async () => {
        await searchTowns(agentForm?.value?.county || null);
        if (!towns.value || towns.value.length === 0) {
          agentForm.value.townId = null;
        } else {
          agentForm.value.townId = towns.value[0].id.toString();
        }
      }
    );

    watch (
      () => agentForm?.value?.townId,
      async () => {
        await searchVillages(parseInt(agentForm?.value?.townId) || null);

        if (!villages.value || villages.value.length === 0) {
          agentForm.value.villageId = null
        } else {
          agentForm.value.villageId = villages.value[0].id.toString();
        }
      }
    );

    watch (
      () => agentForm?.value?.villageId,
      async () => {        
        await searchAgents(parseInt(agentForm?.value?.townId) || null);

        if (!agents.value || agents.value.length === 0) {
          agentForm.value.agentId = null
        } else {
          agentForm.value.agentId = agents.value[0].id.toString();
        }
      }
    );

    return {
      error,
      loading,
      destinationFormRef,
      agentFormRef,
      counties,
      towns,
      villages,
      agents,
      sameAsShipping,
      agentForm,
      destinationForm,
      mock_agents,
      mock_agency_lists,
      activeAgent,
      firstName,
      lastName,
      phone,
      agentId,
      isMapModalOpen,
      isDeliverToMe,
      addBasePath,
      selectNearestAgent,
      handleAgentFormSubmit,
      handleSearchAgent,
      handleContinueToPayment,
      toggleMapModal,
      selectAgent,
      setDeliverToMe,
    };
  }
}
</script>
<style lang="scss" scoped>
@import '~/assets/css/checkout/delivery.scss';
</style>
