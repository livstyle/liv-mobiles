import coffee from "@/assets/images/coffee.png";
import food from "@/assets/images/food.png";
import hamburg from "@/assets/images/hamburg.png";
import lightFood from "@/assets/images/light-food.png";
import { Avatar, ConfigProvider, Image, Search as SearchBar } from "@taroify/core";
import { View } from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
import { useState } from "react";

export default function Index() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  // 搜索
  const onClickSearch = () => {
    Taro.navigateTo({ url: "/pages/Search/index" });
  };

  // 店铺列表
  const onClickShopList = () => {
    Taro.navigateTo({ url: "/pages/ShopList/index" });
  };

  // 菜单列表
  const menuList = [
    {
      id: "coffee",
      name: "奶茶饮品",
      icon: coffee,
    },
    {
      id: "hamburg",
      name: "炸鸡汉堡",
      icon: hamburg,
    },
    {
      id: "lightFood",
      name: "轻食简餐",
      icon: lightFood,
    },
    {
      id: "food",
      name: "特色美味",
      icon: food,
    },
  ];

  // 排序列表
  const sortList = [
    {
      id: "nearby",
      name: "附近商户",
    },
    {
      id: "sales",
      name: "销量",
    },
    {
      id: "speed",
      name: "速度",
    },
    {
      id: "price",
      name: "配送费",
    },
  ];
  const [activeSortId, setActiveSortId] = useState("nearby");

  return (
    <View>
      {/* 导航栏 开始 */}
      <View className="from-[#157658] to-[#156c76] bg-gradient-to-r">
        {/* <View style={{ height: '100%' }}></View> */}
        <View
          className="flex-align flex-row"
          style={{ width: "100%", height: 96 }}
        >
          <View className="ml-[20rpx]">
            <Avatar size="small" src="https://avatars.githubusercontent.com/u/64878070?v=4" />
          </View>
          <View className="ml-[20rpx] truncate text-[32rpx] color-white">三棵杨树</View>
        </View>
      </View>
      {/* 导航栏 结束 */}

      {/* 搜索 开始 */}
      <View className="sticky top-0 z-2">
        <View className="from-[#157658] to-[#156c76] bg-gradient-to-r py-[14rpx]">
          <ConfigProvider
            theme={{
              nutuiSearchbarBackground: "linear-gradient(100deg, #157658, #156c76);",
            }}
          >
            <SearchBar disabled onSearch={onClickSearch} />
          </ConfigProvider>
        </View>
      </View>
      {/* 搜索 结束 */}

      {/* 宫格 开始 */}
      <View className="mx-[32rpx] mt-[24rpx] flex flex-row justify-between rounded-2 bg-[#fff] px-[16rpx] py-[24rpx]">
        {menuList.map(item => (
          <View key={item.id} className="flex-center flex-col" onClick={onClickShopList}>
            <Image src={item.icon} width="40" height="40" />
            <View className="mt-[12rpx] w-[120rpx] truncate py-[4rpx] text-[28rpx] text-gray-700">
              {item.name}
            </View>
          </View>
        ))}
      </View>
      {/* 宫格 结束 */}

      {/* 排序 开始 */}
      <View className="mx-[32rpx] my-[24rpx] flex flex-row text-[28rpx] text-gray-700">
        {sortList.map(item => (
          <View
            key={item.id}
            className={`'mr-[32rpx]' ${activeSortId === item.id && "font-bold"}`}
            onClick={() => setActiveSortId(item.id)}
          >
            {item.name}
          </View>
        ))}
      </View>
      {/* 排序 结束 */}

      {/* 店铺列表 开始 */}
      {/* <ShopCard /> */}
      {/* 店铺列表 结束 */}
    </View>
  );
}
