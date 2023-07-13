<template>
  <div id="my-account">
    <SfContentPages
      title="My Account"
      :active="activePage"
      class="my-account"
      @click:change="changeActivePage"
    >
      <SfContentCategory title="Personal Details">
        <SfContentPage title="My profile" data-testid="my-profile">
          <SfMyProfile
            :account="account"
            data-testid="my-profile-tabs"
            @update:personal="account = { ...account, ...$event }"
            saveButtonText="Save changes"
            updateButtonText="Save changes"
          >
          <template #personal-data-form>
            <form class="form">
              <SfInput
                v-model="personalData.firstName"
                label="First Name"
                name="firstName"
                class="form__element form__element--half"
                required
               
                error-message="Please type your name"
              />
              <SfInput
                v-model="personalData.lastName"
                label="Last Name"
                name="lastName"
                class="form__element form__element--half form__element--half-even"
                required
                
                error-message="Please type your last name. Your name should have at least one character."
              />
              <SfInput
                v-model="personalData.email"
                label="Your email address"
                name="email"
                type="email"
                class="form__element"
                required
                
                error-message="Please type your email"
              />
              <div class="form__action">
                <CopiaButton type="submit">save changes</CopiaButton>
              </div>
            </form>  
          </template>
          <template #password-change-description>
            <p class="message">
              If you want to change the password to access your account, enter the following information: <br />
              <span v-if="user">Your current email address is: <strong>{{ user.email }}</strong></span>
            </p>
          </template>
          <template #password-change-form>
            <ValidationObserver ref="passwordUpdateForm" v-slot="{ handleSubmit }" key="password-update">
              <form class="form password-update" @submit.prevent="handleSubmit(updateUserPassword)">
                <ValidationProvider rules="required" v-slot="{ errors }" tag="div" class="form__element">
                  <SfInput
                    v-model="passwordData.current"
                    label="Your current password"
                    name="password"
                    class="sf-input"
                    :valid="!errors[0]"
                    :error-message="errors[0]"
                    :type="showPasswordCurrent ? 'text' : 'password'"
                    @click:icon="
                        {
                          showPasswordCurrent = !showPasswordCurrent;
                        }
                      "
                    >
                    <template #icon>
                      <img
                        :src="showPasswordCurrent?'./icons/show-password.svg':'./icons/hidden-password.svg'"
                        class="absolute top-3 right-0 cursor-pointer"
                        @click="
                          {
                            showPasswordCurrent = !showPasswordCurrent;
                          }
                        "
                      />
                    </template>
                  </SfInput>
                </ValidationProvider>
                <ValidationProvider rules="required|password:@confirm" v-slot="{ errors }" tag="div" class="form__element form__element--half">
                <SfInput
                  v-model="passwordData.new"
                  label="New password"
                  name="password"
                  class="sf-input"
                  :valid="!errors[0]"
                  :error-message="errors[0]"
                  :type="showPasswordNew ? 'text' : 'password'"
                  @click:icon="
                      {
                        showPasswordNew = !showPasswordNew;
                      }
                    "
                  >
                  <template #icon>
                    <img
                      :src="showPasswordNew?'./icons/show-password.svg':'./icons/hidden-password.svg'"
                      class="absolute top-3 right-0 cursor-pointer"
                      @click="
                        {
                          showPasswordNew = !showPasswordNew;
                        }
                      "
                    />
                  </template>
                </SfInput>
                </ValidationProvider>
                <ValidationProvider name="confirm" rules="required" v-slot="{ errors }" tag="div" class="form__element form__element--half form__element--half-even">
                  <SfInput
                    v-model="personalData.confirm"
                    label="Confirm new password"
                    name="password"
                    class="sf-input"
                    :valid="!errors[0]"
                    :error-message="errors[0]"
                    :type="showPasswordConfirm ? 'text' : 'password'"
                    @click:icon="
                      {
                        showPasswordConfirm = !showPasswordConfirm;
                      }
                    "
                    >
                    <template #icon>
                      <img
                        :src="showPasswordConfirm?'./icons/show-password.svg':'./icons/hidden-password.svg'"
                        class="absolute top-3 right-0 cursor-pointer"
                        @click="
                          {
                            showPasswordConfirm = !showPasswordConfirm;
                          }
                        "
                      />
                    </template>
                  </SfInput>
                </ValidationProvider>
                <div class="form__action">
                  <CopiaButton type="submit">save changes</CopiaButton>
                </div>
              </form> 
            </ValidationObserver>
          </template>
          </SfMyProfile>
        </SfContentPage>
      </SfContentCategory>
      <SfContentPage title="Delivery & Payment Details" />
      <SfContentPage title="Newsletter" />
      <SfContentCategory title="Order Details">
        <SfContentPage title="Order history">
          <SfOrderHistory
            v-if="orderHistoryView"
            tabTitle="My orders"
            orderHistoryDescription="Check the details and status of your orders in the online store. You can also cancel your order or request a return."
            noOrdersDescription="You currently have no order history."
            noOrdersButtonText="Start shopping"
          >
            <template #table>
              <div class="desktop-only">
                <SfTable>
                  <SfTableHeading>
                    <SfTableHeader>Order ID</SfTableHeader>
                    <SfTableHeader>Payment date</SfTableHeader>
                    <SfTableHeader>Payment method</SfTableHeader>
                    <SfTableHeader>Amount</SfTableHeader>
                    <SfTableHeader>Status</SfTableHeader>
                    <SfTableHeader>
                      <button
                        class="sf-button--text sf-button"
                        :aria-disabled="false"
                        :link="null"
                        type="button"
                      >
                        Download all
                      </button>
                    </SfTableHeader>
                  </SfTableHeading>
                  <SfTableRow v-for="(order, i) in orders" :key="i">
                    <SfTableData>{{order.orderID}}</SfTableData>
                    <SfTableData>{{order.paymendDate}}</SfTableData>
                    <SfTableData>{{order.paymendMethod}}</SfTableData>
                    <SfTableData>{{order.amount}}</SfTableData>
                    <SfTableData :class="order.status == 'In process'?'text-warning':'text-success'"><span>{{order.status}}</span></SfTableData>
                    <SfTableData>
                      <button
                        class="sf-button--text sf-button"
                        :aria-disabled="false"
                        :link="null"
                        type="button"
                        @click="orderHistoryView=false"
                      >
                        View details
                      </button>
                    </SfTableData>
                  </SfTableRow>
                </SfTable>
              </div>
              <div class="smartphone-only smartphone-orderhistory">
                <SfTable>
                  <SfTableRow v-for="(order, i) in orders" :key="i">
                    <SfTableData><div>Order ID</div><div>{{order.orderID}}</div></SfTableData>
                    <SfTableData><div>Pay. method</div><div>{{order.paymendMethod}}</div></SfTableData>
                    <SfTableData ><div>Status</div><div :class="order.status == 'In process'?'text-warning':'text-success'"><span>{{order.status}}</span></div></SfTableData>
                    <SfTableData><div>Pay. date</div><div>{{order.paymendDate}}</div></SfTableData>
                    <SfTableData><div>Amount</div><div>{{order.amount}}</div></SfTableData>
                    <SfTableData>
                      <button
                        class="sf-button--text sf-button"
                        :aria-disabled="false"
                        :link="null"
                        type="button"
                        @click="orderHistoryView=false"
                      >
                        View details
                      </button>
                      <button
                        class="sf-button--text sf-button"
                        :aria-disabled="false"
                        :link="null"
                        type="button"
                        @click="orderHistoryView=false"
                      >
                        Download all
                      </button>
                    </SfTableData>
                  </SfTableRow>
                </SfTable>
              </div>
            </template>
            <template #no-orders>
              <p class="no-orders--title">You currently have no order history.</p>
              <CopiaButton :class="'no-order-button'">
                Start Shopping
              </CopiaButton>
            </template>
          </SfOrderHistory>
          <OrderDetail v-else />
        </SfContentPage>
      </SfContentCategory>
      <SfContentPage title="Log out" icon="login" />
    </SfContentPages>
  </div>
</template>
<script>
import { SfBreadcrumbs, SfContentPages, SfInput, SfButton, SfTable } from "@storefront-ui/vue";
import OrderDetail from '~/components/MyAccount/OrderDetail.vue';
import CopiaButton from "~/components/Core/Atoms/CopiaButton.vue";
import {
  SfMyProfile,
  SfShippingDetails,
  SfMyNewsletter,
  SfOrderHistory,
} from "@storefront-ui/vue";
import { onSSR } from '@vue-storefront/core';
import { useUser } from '@vue-storefront/odoo';
import { ref, useRouter } from '@nuxtjs/composition-api';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { useUiNotification, useMyAccount } from '~/composables';

extend('password', {
  params: ['target'],
  validate(value, { target }) {
    return value === target;
  },
  message: 'Password confirmation does not match'
});

export default {
  name: "MyAccount",
  middleware: ['is-authenticated'],
  components: {
    SfBreadcrumbs,
    SfContentPages,
    SfMyProfile,
    SfShippingDetails,
    SfMyNewsletter,
    SfOrderHistory,
    SfInput, 
    SfButton,
    SfTable,
    OrderDetail,
    CopiaButton,
    ValidationObserver,
    ValidationProvider,
  },
  setup(){
    const router = useRouter();
    const { logout, load: loadUser, user } = useUser();
    const { send } = useUiNotification();
    const { updatePassword, errors } = useMyAccount();

    const activePage = ref('My profile');
    const breadCrumbs =  [
      {
        text: "Home",
        link: "/",
      },
      {
        text: "My Account",
        link: "#",
      },
    ];

    onSSR(async () => {
      await loadUser()
    })

    const account= {
        firstName: "James",
        lastName: "Lee",
        email: "jlee@odoogap.com",
        password: "a*23Et",
        shipping: [
          {
            firstName: "John",
            lastName: "Dog",
            streetName: "Sezame Street",
            apartment: "24/193A",
            city: "Wroclaw",
            state: "Lower Silesia",
            zipCode: "53-540",
            country: "Poland",
            phoneNumber: "(00)560 123 456",
          },
          {
            firstName: "John",
            lastName: "Dog",
            streetName: "Sezame Street",
            apartment: "20/193A",
            city: "Wroclaw",
            state: "Lower Silesia",
            zipCode: "53-603",
            country: "Poland",
            phoneNumber: "(00)560 123 456",
          },
        ],
    };
    const orders = [
      {orderID: "#35765", paymendDate: "4th Nov, 2019",paymendMethod: "Visa card",amount: "KESS 112.00", status:"In process" },
      {orderID: "#35765", paymendDate: "4th Nov, 2019",paymendMethod: "Visa card",amount: "KESS 112.00", status:"In process" },
      {orderID: "#35765", paymendDate: "4th Nov, 2019",paymendMethod: "Visa card",amount: "KESS 112.00", status:"In process" },
      {orderID: "#35765", paymendDate: "4th Nov, 2019",paymendMethod: "Visa card",amount: "KESS 112.00", status:"Delivered" },
    
    ]
    const personalData = ref({});
    const showPasswordCurrent = ref(true);
    const showPasswordConfirm = ref(false);
    const showPasswordNew = ref(false);

    const passwordUpdateForm = ref()
    const passwordData = ref({});
    const orderHistoryView = ref(true)

    const changeActivePage = async (title) => {
      if (title === "Log out") {
        await logout();
        send({ message: 'Logged out successfully', type: 'success' });
        router.replace('/');
        return;
      }
      activePage.value = title;
    };

    const updateUserPassword = async () => {
      await updatePassword(
        {
          currentPassword: passwordData.value?.current,
          newPassword: passwordData.value?.new,
        }
      )
      passwordData.value = {
        current: '',
        new: '',
        confirm: ''
      }
      passwordUpdateForm.value?.reset()
      send({ message: 'Password updated successfully', type: 'success' });
    }

    return {
      activePage,
      breadCrumbs,
      account,
      orders,
      changeActivePage,
      personalData,
      passwordData,
      orderHistoryView,
      showPasswordCurrent,
      showPasswordConfirm,
      showPasswordNew,
      user,
      passwordUpdateForm,
      updateUserPassword,
    }
  }
};
</script>
<style lang="scss" scoped>
// @import "~@storefront-ui/vue/styles";
#my-account {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1272px;
    padding: 0;
    margin: var(--spacer-xl) auto;
  }

}
.my-account {
  --font-family--secondary: 'Montserrat';
  --font-family--primary: 'Lato';
  --c-primary: #1D1F22;
  @include for-desktop{
    --table-header-font-weight: 700 !important;
    --table-data-font-weight: 700;
  }
  @include for-mobile {
    --content-pages-sidebar-category-title-font-weight: var(
      --font-weight--normal
    );
    --content-pages-sidebar-category-title-margin: var(--spacer-sm)
      var(--spacer-sm) var(--spacer-sm) var(--spacer-base);
  }
  @include for-desktop {
    --content-pages-sidebar-category-title-margin: var(--spacer-xl) 0 0 0;

  }

}
.form {
  padding: var(--spacer-sm) 0;
  &__group {
    display: flex;
    align-items: flex-start;
  }
  &__action-button {
    &:first-child {
      margin: var(--spacer-sm) 0 0 0;
    }
    &--secondary {
      margin: var(--spacer-sm) 0 var(--spacer-sm) var(--spacer-base);
    }
  }
  &__button {
    --button-width: 100%;
  }
  @include for-mobile {
    #message {
      padding: var(--spacer-sm);
      box-sizing: border-box;
      margin: 1rem 0 1rem 0;
      width: 100%;
    }
    &__element--range {
      margin: var(--spacer-sm) 0 var(--spacer-2xl);
    }
    &__action {
      width: 100%;
    }
    .sf-button {
      --button-width: auto;
      margin-top: var(--spacer-xs);
      --button-width: 100%
    }
    &__element {
      flex: 0 0 100%;
      &--half {
        flex: 1 1 100%;
      }
      &--range {
        margin: var(--spacer-sm) 0 var(--spacer-2xl);
      }
    }
  }
  @include for-desktop {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    margin: 0 var(--spacer-2xl) 0 0;
    &:last-of-type {
      margin: 0 0 0 0;
    }
    &__element {
      margin: 0 0 var(--spacer-sm) 0;
      flex: 0 0 100%;
      &--half {
        flex: 1 1 50%;
        &-even {
          padding: 0 0 0 var(--spacer-xl);
        }
      }
      &--range {
        margin: var(--spacer-xl) var(--spacer-base) var(--spacer-2xl);
      }
    }
    &__action {
      flex: 0 0 100%;
      display: flex;
    }
    &__button {
      --button-width: auto;
    }
  }
}
.breadcrumbs {
  padding: var(--spacer-base) 0 var(--spacer-lg);
}
.password-update{
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.no-orders--title{
  font-family: 'Montserrat';
  margin-bottom: var(--spacer-xl);
  font-weight: 700;
  font-size: 16px;
  color: #43464E;
}
.no-order-button{
  @include for-mobile{
    width: 100%;
  }
}
::v-deep{
  .sf-content-pages{

    .sf-table__header{
      font-weight: 700;
    }
    @include for-desktop{
      height: auto;
      --content-pages-sidebar-flex: 0 0 374px;
      --content-pages-sidebar-padding: 40px 40px 14px 40px;
      &__sidebar {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        
        div:nth-child(3) {
          margin-top: -20px;
        }
        div:nth-child(4){
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        }
        h2{
          margin-top: 0;
        }
        div:nth-child(5){
          .sf-menu-item__label{
            text-decoration: underline;
            color: #1D1F22 !important;
            font-weight: 700 !important;
          }
        }
      }
    }
    .sf-address span{
      margin: 0;
    }
  }
  .sf-content-pages__title{
    font-weight: 800;
    font-size: 24px !important;
  }
  .sf-content-pages__category-title{
    @include for-desktop{
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    color: #8D8F9A;
    border-bottom: 1px solid #8D8F9A;
    width: max-content;
    padding-bottom: 9px;
    }
  }
  .sf-menu-item {
    --menu-item-label-color:#43464E;
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
  }
  .sf-menu-item.is-active{
    --menu-item-label-color: #E81E2B !important; 
  }
  .sf-content-pages__content{
    @include for-desktop{
      margin-left: 98px !important;
      padding: 0 !important;
      height: auto;
      }
    .sf-tabs__title.is-active{
      font-weight: 600;
    }
  }
  .message{
    font-weight: 400;
  }
  .notice{
    font-weight: 400;
    a {
      color: #0468DB;
      font-weight: 700;

    }
  }
  .sf-menu-item__icon{
    width: 24px;
    height: 24px;
    color: #000000;
    @include for-mobile{
      display: none !important;
    }
  }
  .sf-table__header:last-child{
    @include for-desktop{
      text-align: right;
    }
  }
  .sf-table__data:last-child{
      @include for-desktop{
      text-align: right;
    }
  }

  .sf-table__data{
    .sf-button--text{
      color: #0468DB;
      font-family: 'Montserrat';
      font-style: normal;
      font-weight: 700;
      font-size: 14px;
      line-height: 18px;
    }
  }
  table{
    letter-spacing: -1px;
    thead{
      tr{
        border-bottom: 2px solid #E81E2B;
      }
    }
  }
  .sf-table__header{
    font-size: 14px !important;
    .sf-button--text{
      color: #0468DB;
      font-family: 'Montserrat';
      font-style: normal;
      font-weight: 700;
      font-size: 14px;
      line-height: 18px;
    }
  }
  .sf-table__data{
    font-size: 14px !important;
    span{
      padding: 5px 14px;
      color: #43464E !important;
      font-family: 'Montserrat';
      font-style: normal;
      font-weight: 700;
      font-size: 14px;
    }
    &.text-warning{
      background: #FECB06;
      border-radius: 50px;
      text-align: center;
    }
    &.text-success{
      background: #71B232;
      border-radius: 50px;
      text-align: center;
    }
  }
  
.smartphone-orderhistory{
  tr {
    display: block;
    border-bottom: none;
    padding: 18px 0;
  }
  td{
    display: flex;
    border-bottom: 1px solid #F1F2F3;
    padding-top: 6px;
    padding-bottom: 7px;
    &>div{
      width: 45%;
    }
    &:last-child{
      border:none;
      justify-content: space-between;
      padding-top: 10px;
      padding-bottom: 40px;
      border-bottom: 1px solid #8D8F9A;
    }
  }

    .text-warning span{
      background: #FECB06;
      border-radius: 50px;
      text-align: center;
    }
    .text-success span{
      background: #71B232;
      border-radius: 50px;
      text-align: center;
    }
}
}

</style>