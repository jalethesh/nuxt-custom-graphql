<template>
  <div>
    <div class="order-process-flow">
      <ul class="flex desktop-only">
        <li class="flex">
          <p class="icon flex justify-center items-center">
            <img
              :src="addBasePath('/homepage/busket.png')"
              alt
              width="30"
              id="free-delivery--image"
            />
          </p>
          <p class="description">
            <span class="block description-title">SHOP</span>
            <span class="description-content"
              >Browse through goods and select what you would like to send</span
            >
          </p>
        </li>
        <li class="flex">
          <p class="icon flex justify-center items-center">
            <img
              :src="addBasePath('/homepage/location1.png')"
              alt
              width="30"
              id="free-delivery--image"
            />
          </p>
          <p class="description">
            <span class="block description-title">LOCATION</span>
            <span class="description-content"
              >Let us know where you would like your goods delivered</span
            >
          </p>
        </li>
        <li class="flex">
          <p class="icon flex justify-center items-center">
            <img
              :src="addBasePath('/homepage/carbon_delivery.png')"
              alt
              width="30"
              id="free-delivery--image"
            />
          </p>
          <p class="description">
            <span class="block description-title">DELIVERY</span>
            <span class="description-content"
              >Copia will deliver your goods to your nearest delivery point in
              2-4 days</span
            >
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { SfIcon } from '@storefront-ui/vue';
import { addBasePath } from '@vue-storefront/core';

export default {
  name: 'OrderProcess',
  components: {
    SfIcon,
  },
  setup() {
    return {
      SfIcon,
      addBasePath,
    };
  },
};
</script>
<style lang="scss" scoped>
.description-title {
  color: #1d1f22;
  font-size: 16px;
  font-family: 'Montserrat';
  font-weight: 700;
}
.description-content {
  font-family: 'Lato';
  font-size: 14px;
  color: #43464e;
}
.hero-smartphone {
  .li-div {
    border: 1px solid #e0e0e1;
    padding: 10px 10px;
    align-items: center;
    width: 100%;
    display: flex;
    .icon-div {
      background: #fecb06;
      width: 64px;
      height: 64px;
      border-radius: 60%;
      margin-right: 16px;
      span {
        top: calc(50% - 13px);
      }
      svg {
        fill: #fd0019;
      }
    }
    .description {
      width: calc(100% - 64px);
    }
  }
}
.order-process-flow {
  border: 1px solid #e0e0e1;
  @include for-mobile {
    border: 0;
  }
  ul {
    li {
      box-sizing: border-box;
      padding: 25px 40px;
      &:nth-child(2) {
        background: url('/homepage/location.png');
        background-size: 100% 101%;
        margin-top: -1px;
        z-index: -12;
        width: 56%;
        padding: 25px 77px;
      }
      p.icon {
        background: #fecb06;
        width: 64px;
        height: 64px;
        border-radius: 60%;
        margin-right: 16px;
        span {
          top: calc(50% - 13px);
        }
        svg {
          fill: #fd0019;
        }
      }
      p.description {
        width: calc(100% - 64px);
      }
    }
  }
}
</style>
