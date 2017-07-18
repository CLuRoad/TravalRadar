//
//  WUHotUpdateManager.h
//  HotUpdateDemo
//
//  Created by RoadClu on 2017/7/14.
//  Copyright © 2017年 worldunion. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface WUHotUpdateManager : NSObject


/**
 检查更新
 */
- (void)checkUpdata;



/**
 获取 jsbundle 的路径

 */
- (NSString *)getJsbundlePath;

@end
