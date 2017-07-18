//
//  PhotoBrowserView.m
//  TravalApp
//
//  Created by RoadClu on 2017/7/10.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "PhotoBrowserView.h"
#import "SDCycleScrollView.h"

@interface SDCycleScrollView()<SDCycleScrollViewDelegate>
@property (nonatomic, strong) SDCycleScrollView *cycleScrollerView;

@end

@implementation PhotoBrowserView

RCT_EXPORT_MODULE()

RCT_EXPORT_VIEW_PROPERTY(imageURLStringsGroup, NSArray)

- (UIView *)view {
  SDCycleScrollView *_cycleScrollerView = [SDCycleScrollView cycleScrollViewWithFrame:CGRectZero delegate:self placeholderImage:nil];
  _cycleScrollerView.autoScroll = NO;
  
  
  _cycleScrollerView.pageControlStyle = SDCycleScrollViewPageContolStyleNone;

  
  return _cycleScrollerView;
}




@end
