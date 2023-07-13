<template>
  <div class="order-history-detail">
    <div class="order-detail-header">
      <p class="order-detail-title">
        Order Details #35765
      </p>
      <SfAlert message="Order was sent and received." type="success">
        <template #icon>
          <SfIcon icon="info" color="#71B232"/>
        </template>
        <template #message>
          <p class="order-alert">Order was sent and received.</p>
        </template>
      </SfAlert>
    </div>
    <div class="order-address">
      <div class="order-description-indi">
        <p class="order-billing">
          Delivery location
        </p>
        <SfAddressPicker selected="">
          <SfAddress name="first">
            <span>Name of the County</span>
            <span>Name of the City/Town</span>
            <span>Name of the Village</span>
          </SfAddress>
        </SfAddressPicker>
      </div>
      <div class="order-description-indi">
        <p class="order-billing">
          Billing Address
        </p>
        <SfAddressPicker selected="">
          <SfAddress name="first">
            <span>Jack Smith</span>
            <span>Mazowiecka 34</span>
            <span>02-020</span>
            <span>Warszawa, Mazowieckie</span>
            <span>Poland</span>
            <span>+48 777 777 777</span>
          </SfAddress>
        </SfAddressPicker>
      </div>
    </div>
    <div class="order-description">
      <div class="order-description-indi">
        <p class="order-billing">Delivery </p>
        <p class="order-billing-station">Delivery to me</p>
      </div>
      <div class="order-description-indi">
        <p class="order-billing">Payment </p>
        <p class="order-billing-station">M-PESA EXPRESS</p>
      </div>
    </div>
    <SfConfirmOrder
      orderTitle="Ordered Items"
      :orderTitleLevel="3"
    >
      <template #table>
        <SfTable>
          <SfTableHeading>
            <SfTableHeader>Item</SfTableHeader>
            <SfTableHeader>Description</SfTableHeader>
            <SfTableHeader>Color</SfTableHeader>
            <SfTableHeader>Size</SfTableHeader>
            <SfTableHeader>Quantity</SfTableHeader>
            <SfTableHeader>Amount</SfTableHeader>
          </SfTableHeading>
          <SfTableRow v-for="(order, i) in orderDetail" :key="i">
            <SfTableData><SfImage :src="order.image" :width="82" :height="104" alt="product"/></SfTableData>
            <SfTableData><p>{{order.title}}</p><p class="order-sku">SKU: {{order.sku}}</p></SfTableData>
            <SfTableData>{{order.color}}</SfTableData>
            <SfTableData>{{order.size}}</SfTableData>
            <SfTableData>{{order.qty}}</SfTableData>
            <SfTableData>{{order.price.regular}}</SfTableData>
          </SfTableRow>
        </SfTable>
      </template>
      <template #summary>
        <div class="order-detail-summary"><p>Subtotal:</p><p>KES 1150.00</p></div>
        <div class="order-detail-summary"><p>Shipping:</p><p>Free</p></div>
        <div class="order-detail-total"><p>Total price:</p><p>KES 1150.00</p></div>
      </template>
      <template #checkbox> </template>
    </SfConfirmOrder>
    <CopiaButton>
      GO BACK
    </CopiaButton>
  </div>
</template>
<script>
import { SfConfirmOrder, SfAddressPicker, SfButton, SfAlert, SfIcon, SfTable, SfImage } from "@storefront-ui/vue";
import CopiaButton from "../Core/Atoms/CopiaButton.vue";
import { ref } from '@vue/composition-api';
export default {
  name: "OrderDetail",
  components: {
    SfAddressPicker,
    SfConfirmOrder,
    SfButton,
    SfAlert,
    SfIcon,
    SfTable,
    SfImage,
    CopiaButton
  },
  setup(){
    const orderDetail = [
        {
          title:"Highlands Orange Juice Cordial 3L",
          image:"/accountPage/orderReview.png",
          price:{"regular":"KES 385.00"},
          size: "N/A",
          color:"N/A",
          qty:1,
          sku:"KF675"
        },
        {
          title:"Highlands Orange Juice Cordial 3L",
          image:"/accountPage/orderReview.png",
          price:{"regular":"KES 385.00"},
          size: "N/A",
          color:"N/A",
          qty:1,
          sku:"KF675"
        },
        {
          title:"Highlands Orange Juice Cordial 3L",
          image:"/accountPage/orderReview.png",
          price:{"regular":"KES 385.00"},
          size: "N/A",
          color:"N/A",
          qty:1,
          sku:"KF675"
        },  
      ];
    return {
      orderDetail
    }
  }
};
</script>
<style lang="scss" scoped>
.order-history-detail{
  .sf-table__header:nth-child(even){
    order: 0;
  }
  .sf-table__data:nth-child(even){
    order: 0;
  }
  .sf-button{
    @include for-mobile{
      width: 100%;
    }
  }
  .sf-table__data span{
    padding:0 ;
  }
  .sf-image{
    outline: none;
  }
  .sf-content-pages{
    @include for-desktop{
    } 
  }
  .order-sku{
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    color: #E81E2B;
  }
  
}
::v-deep{
  .sf-table__row{
    padding: 8px 16px !important;
  }
  .sf-radio__container{
    @include for-desktop{
      height: 140px;
    }
  }
  .sf-table__header:last-child{
      text-align: right;
  }
  .sf-table__data:last-child{
      text-align: right;
  }
  @include for-mobile{
    .sf-table__header:nth-child(3), .sf-table__data:nth-child(3) {
      text-align: right;
    }
  }
}
.order-history-detail{
  @include for-mobile{
    padding: 16px;
  }
}

.order-detail-header{
  @include for-desktop{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  margin-bottom: 40px;
  .order-detail-title{
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 800;
    font-size: 24px;
    color: #43464E;
    width: 200px;
    @include for-mobile{
      font-size: 18px;
      width: 100%;
      margin-bottom: 22px;
    }
  }
  .order-alert{
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    color: #71B232;
    @include for-mobile{
      font-size: 16px;
    }
  }

}
.order-address{
  @include for-desktop{
    display: flex;
    justify-content: space-between; 
    align-items: stretch;
  }
}
.order-description{
  @include for-desktop{
    display: flex;
    justify-content: space-between;
  }
}
.order-description-indi{
  @include for-desktop{
    // width: 40%;
  }
  width: 100%;
  margin-bottom: 40px;
}
.order-billing{
  font-family: 'Montserrat';
  font-weight: 600;
  font-size: 18px;
  color: #1D1F22;
  margin-bottom: 40px;
  @include for-mobile{
    font-weight: 700;
    margin-bottom: 14px
  }
}
.order-billing-station{
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #43464E;
}

.order-detail-summary{
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
  p{
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 26px;
    color: #43464E;
  }
}
.order-detail-total{
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  padding-top: 13px;
  margin-bottom: 77px;
  border-top: 2px solid #E81E2B;
  @include for-mobile{
    margin-bottom: 40px;
    margin-top: 40px;
  }
  p{
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 800;
    font-size: 24px;
    line-height: 32px;
    color: #1D1F22;
  }
}
</style>