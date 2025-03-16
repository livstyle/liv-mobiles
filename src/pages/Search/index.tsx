import { ConfigProvider, Search as SearchBar } from "@taroify/core";
import Button from "@taroify/core/button/button";
import { DeleteOutlined } from "@taroify/icons";
import { Text, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useState } from "react";

function Search() {
  // TEST: 搜索历史列表
  const [searchList, setSearchList] = useState([
    "奶茶",
    "炸鸡汉堡",
    "自助",
    "火锅",
    "coffee",
    "烧烤",
  ]);

  // 全部删除搜索历史
  const onClearSearchListAll = () => {
    Taro.showModal({
      title: "提示",
      content: "确定要清空搜索历史吗?",
      success: (res) => {
        if (res.confirm) {
          setSearchList([]);
        }
      },
    });
  };

  // 是否删除单个搜索项
  const [isDelSearchItem, setIsDelSearchItem] = useState(false);

  // 删除单个搜索项 - 长按触发
  const onClearSearchItem = (item: string) => {
    Taro.showModal({
      title: "提示",
      content: "确定要删除该搜索历史吗?",
      success: (res) => {
        if (res.confirm) {
          setSearchList(searchList.filter(i => i !== item));
        }
      },
    });
  };

  // 热门搜索显示与隐藏
  const [isShowHotList, setIsShowHotList] = useState(false);

  return (
    <View>
      {/* 搜索栏 开始 */}
      <ConfigProvider
        theme={{
          nutuiSearchbarPadding: "10px 16px",
          nutuiSearchbarBackground: "#ffffff",
          nutuiSearchbarContentBackground: "#f5f5f5",
        }}
      >
        <SearchBar shape="round" />
      </ConfigProvider>
      {/* 搜索栏 结束 */}

      <View className="w-full bg-[#fff]">
        {/* 搜索历史 开始 */}
        {searchList.length > 0 && (
          <View className="box-border w-full p-[20rpx]">
            <View className="flex-align h-[70rpx] flex-row justify-between">
              <View className="text-[30rpx] color-[#333] font-bold">搜索历史</View>
              {isDelSearchItem ? (
                <View
                  className="text-[24rpx] color-[#157658]"
                  onClick={() => setIsDelSearchItem(false)}
                >
                  完成
                </View>
              ) : (
                <DeleteOutlined size="36rpx" color="#999" onClick={onClearSearchListAll} />
              )}
            </View>
            <View className="flex flex-row flex-wrap">
              {searchList.map((item, index) => (
                <View
                  key={index}
                  className="mr-[30rpx] mt-[20rpx] flex-center flex-row rounded-[30rpx] bg-[#f6f6f6] px-[20rpx] py-[10rpx] text-center"
                  onLongPress={() => setIsDelSearchItem(true)}
                >
                  <Text
                    className={`'text-[28rpx] color-[#666]' ${isDelSearchItem && "mr-[10rpx]"}`}
                  >
                    {item}
                  </Text>
                  {isDelSearchItem && (
                    <Button onClick={() => onClearSearchItem(item)}>关闭</Button>
                  )}
                </View>
              ))}
            </View>
          </View>
        )}
        {/* 搜索历史 结束 */}

        {/* 热门搜索 开始 */}
        <View className="box-border w-full p-[20rpx]">
          <View className="flex-align h-[70rpx] flex-row justify-between">
            <View className="text-[30rpx] color-[#333] font-bold">热门搜索</View>
            <View onClick={() => setIsShowHotList(!isShowHotList)}>
              {/* TODO:  */}
            </View>
          </View>
          <View className="flex flex-row flex-wrap">
            {!isShowHotList ? (
              <>
                <View className="mr-[30rpx] mt-[20rpx] flex-center flex-row rounded-[30rpx] bg-[#f6f6f6] px-[20rpx] py-[10rpx]">
                  <Text className="text-[28rpx] color-[#666]">面霸</Text>
                </View>
              </>
            ) : (
              <View className="mt-[20rpx] flex-1 text-center text-[28rpx] color-[#808080]">
                当前猜你想搜已隐藏
              </View>
            )}
          </View>
        </View>
        {/* 热门搜索 结束 */}
      </View>
    </View>
  );
}

export default Search;
