//
//  CityPicker.m
//  TravalApp
//
//  Created by RoadClu on 2017/7/9.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "DeviceInfoManager.h"

@implementation DeviceInfoManager

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(getDeviceInfo)
{
  RCTLog(@"获取设备信息");
}

RCT_EXPORT_METHOD(finishBlock:(RCTResponseSenderBlock)callback)
{
  UIDevice *currentDevice = [UIDevice currentDevice];
  NSString *strName = currentDevice.name;    //设备名称
  NSString *strModel = currentDevice.model;    //设备类别
  NSString *strLocalizedModel = currentDevice.localizedModel;    //设备本地化版本
  NSString *strSystemName = currentDevice.systemName;    //设备运行的系统
  NSString *strSystemVersion = currentDevice.systemVersion;    //当前系统版本
  NSString *strUUIDString = currentDevice.identifierForVendor.UUIDString;    //系统识别码
  
  NSString *infoStr =[NSString stringWithFormat: @"设备名称：%@\n设备类别：%@\n设备本地化版本：%@\n设备运行的系统：%@\n当前系统版本：%@\n系统识别码：%@",strName ,strModel ,strLocalizedModel ,strSystemName ,strSystemVersion , strUUIDString];
  callback(@[[NSNull null], infoStr]);
}



@end
