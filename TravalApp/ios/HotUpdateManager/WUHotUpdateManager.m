//
//  WUHotUpdateManager.m
//  HotUpdateDemo
//
//  Created by RoadClu on 2017/7/14.
//  Copyright © 2017年 worldunion. All rights reserved.
//

#import "WUHotUpdateManager.h"
#import "WUFileManager.h"

@interface WUHotUpdateManager(){
    NSString *serverBundleVersion;
}
@property (nonatomic, strong)WUFileManager *fileMgr;

@end
// URL
#define ServerPackagePath @"http://1.travalradar.applinzi.com/TravalApp/package.json"
#define ServerJsbundlePath @"http://1.travalradar.applinzi.com/TravalApp/bundle/bundle.zip"

// PATH
#define AppSupprtDir [NSSearchPathForDirectoriesInDomains(NSApplicationSupportDirectory, NSUserDomainMask, YES) firstObject]

// 已下载，待验证的jsbundle信息
#define JsBundleInfo_Update @"JsBundleInfo_Update"
#define JsBundleVersion_Update @"JsBundleVersion_Update"

#define JsBundleInfo_Local @"JsBundleInfo_Local"
#define JsBundleVersion_Ignored @"JsBundleVersion_Ignored"
#define JsBundleVersion_Local @"JsBundleVersion_Local"

@implementation WUHotUpdateManager

- (instancetype)init{
    if (self = [super init]) {
        _fileMgr = [WUFileManager new];
    }
    return self;
}



#pragma mark ----- 检查更新
/**
 检查更新
 */
- (void)checkUpdata {
    // 获取服务器 jsbundle 版本
    serverBundleVersion = [self getServerJsBundleVersion];
    
    // 获取本地版本信息
    NSDictionary *localBundleInfo = [[NSUserDefaults standardUserDefaults] objectForKey:JsBundleInfo_Local];
    
    if (!localBundleInfo || ![localBundleInfo isKindOfClass:[NSDictionary class]]) {
        return;
    }
    
    NSString *ignoredVersion = [localBundleInfo objectForKey:JsBundleVersion_Ignored];
    NSString *localBundleVersion = [localBundleInfo objectForKey:JsBundleVersion_Local];
    
    if ([ignoredVersion isEqualToString:serverBundleVersion]) {
        return;
    }
    
    if ([serverBundleVersion compare:localBundleVersion options:NSCaseInsensitiveSearch] == NSOrderedDescending) {
        
        // 有新版本 下载新jsbundle
        [self downloadNewJsbundle];
    }
}


/**
 下载 jsbundle
 */
- (void)downloadNewJsbundle {
    
    NSURLSession *session = [NSURLSession sharedSession];
    
    NSURL *url = [NSURL URLWithString:ServerJsbundlePath];
    __weak typeof(self) weakSelf = self;
    
    NSURLSessionDownloadTask *task = [session downloadTaskWithURL:url completionHandler:^(NSURL *location, NSURLResponse *response, NSError *error) {
        
        NSString *zipPath = [self zipDownloadFilePathWithVersion:serverBundleVersion];
    
        if (!error) {
            [weakSelf.fileMgr moveItemFromURL:location toPath:zipPath completionHandler:^(NSError *error) {
                
                if (!error) {
                    // 解压
                    NSString *filePath = [self unzipDirPathWithVersion:serverBundleVersion];
                    
                    [weakSelf.fileMgr unzipFileAtPath:zipPath toDestination:filePath progressHandler:^(NSString *entry, long entryNumber, long total) {
                        
                    } completionHandler:^(NSString *path, BOOL succeeded, NSError *error) {
                        
                        if (!error) {
                          // 下载、解压成功后，增量更新 合包
                          [self mergeJsbundle];
                            
                        }
                      
                     
                        
                    }];
                }
                
            }];
        }
        
    }];
    [task resume];
    
}


/**
 增量更新合并代码
 */
- (void)mergeJsbundle {
  NSFileManager *fm = [NSFileManager defaultManager];
  NSString *newFilePath = [self unzipDirPathWithVersion:serverBundleVersion];
  NSArray *contens = [fm contentsOfDirectoryAtPath:newFilePath error:nil];
  if (!contens || contens.count == 0) {
    return;
  }
  
  NSString *fileName;
  for (NSString *name in contens) {
    if ([name hasSuffix:@"patch"]) {
      fileName = name;
    }
  }
  
  NSString *filePath = [newFilePath stringByAppendingPathComponent:fileName];
  
  // 增量更新
  [_fileMgr bsdiffFileAtPath:filePath fromOrigin:[self getJsbundlePath] toDestination:[self bsdiffResultBundlePathWithVersion:serverBundleVersion] completionHandler:^(BOOL success) {
    
    if (success) {
      // 合并成
      // 保存 update 信息
      [fm removeItemAtPath:[self jsbundlePath] error:nil];
      [fm removeItemAtPath:[[self jsbundleDirPath] stringByAppendingPathComponent:@"assets.zip"] error:nil];
      
      [fm copyItemAtPath:[self assetBundlePathWithVersion:serverBundleVersion] toPath:[[self jsbundleDirPath] stringByAppendingPathComponent:@"assets.zip"] error:nil];
      [_fileMgr unzipFileAtPath:[self assetBundlePathWithVersion:serverBundleVersion] toDestination:[self jsbundleDirPath] progressHandler:^(NSString *entry, long entryNumber, long total) {
        
      } completionHandler:^(NSString *path, BOOL succeeded, NSError *error) {
        
        if (!error) {
          [fm copyItemAtPath:[self bsdiffResultBundlePathWithVersion:serverBundleVersion] toPath:[self jsbundlePath] error:nil];
          
          NSDictionary *localJsInfo = @{
                                        JsBundleVersion_Local:serverBundleVersion
                                        };
          [[NSUserDefaults standardUserDefaults] setObject:localJsInfo forKey:JsBundleInfo_Local];
          [[NSUserDefaults standardUserDefaults] synchronize];
          
        }
        
      }];
      
    }
    
  }];
}


/**
 获取 服务器 jsBundle 版本
 */
- (NSString *)getServerJsBundleVersion{
    NSData *serverPackageData = [NSData dataWithContentsOfURL:[NSURL URLWithString:ServerPackagePath]];
    
    if (!serverPackageData) {
        return nil;
    }
    
    NSDictionary *serverPackageDic = [NSJSONSerialization JSONObjectWithData:serverPackageData options:NSJSONReadingMutableLeaves error:nil];
    
    return [serverPackageDic objectForKey:@"version"];
}


#pragma mark ----- 获取 jsbundle 的路径
- (NSString *)getJsbundlePath{
    
    NSDictionary *localInfo = [[NSUserDefaults standardUserDefaults] objectForKey:JsBundleInfo_Local];
    NSString *localJsVersion;
  
  NSFileManager *fm = [NSFileManager defaultManager];

    if ([fm fileExistsAtPath:[self jsbundlePath]] && localInfo && (localJsVersion=localInfo[JsBundleVersion_Local])) {
        
        return [self jsbundlePath];
        
        
    } else {
        
        // 初始化版本信息
      NSString *packagePath = [[NSBundle mainBundle] pathForResource:@"package.json" ofType:nil];
      NSData *packageData = [NSData dataWithContentsOfURL:[NSURL fileURLWithPath:packagePath]];
      NSDictionary *packageDic = [NSJSONSerialization JSONObjectWithData:packageData options:NSJSONReadingMutableLeaves error:nil];
      
      
        localInfo = @{
                      JsBundleVersion_Local:packageDic[@"version"]
                      };
        [[NSUserDefaults standardUserDefaults] setObject:localInfo forKey:JsBundleInfo_Local];
        [[NSUserDefaults standardUserDefaults] synchronize];
        
        return [[NSBundle mainBundle] pathForResource:@"index.ios.jsbundle" ofType:nil];
    }
    
    
    return nil;
}



#pragma mark ----- 路径管理

// zip下载地址
- (NSString *)zipDownloadFilePathWithVersion:(NSString *)version {
    NSString *path = [AppSupprtDir stringByAppendingPathComponent:version];
    [_fileMgr createDir:path];
    
    return [path stringByAppendingPathComponent:@"bundle.zip"];
}

// zip解压地址
- (NSString *)unzipDirPathWithVersion:(NSString *)version {
    NSString *zipDirPath = [AppSupprtDir stringByAppendingPathComponent:version];
    NSString *unzipDirPath = [zipDirPath stringByAppendingPathComponent:@"bundle"];
    
    [_fileMgr createDir:unzipDirPath];
    
    return unzipDirPath;
}

// diff合并后的地址
- (NSString *)bsdiffResultBundlePathWithVersion:(NSString *)version {
  NSString *zipDirPath = [AppSupprtDir stringByAppendingPathComponent:version];
  return [zipDirPath stringByAppendingPathComponent:@"index.ios.jsbundle"];
}

// asset.zip 的地址
- (NSString *)assetBundlePathWithVersion:(NSString *)version {
  NSString *zipDirPath = [AppSupprtDir stringByAppendingPathComponent:version];
  NSString *assetPath = [zipDirPath stringByAppendingPathComponent:@"bundle"];
  return [assetPath stringByAppendingPathComponent:@"assets.zip"];
}

// 存放jsbundle的文件夹的路径
- (NSString *)jsbundleDirPath {
    NSString *path = [AppSupprtDir stringByAppendingPathComponent:@"reactnativeBundle"];
    
    [_fileMgr createDir:path];
    return path;
}

// jsbundle的路径
- (NSString *)jsbundlePath{
    
    NSString *path = [AppSupprtDir stringByAppendingPathComponent:@"reactnativeBundle"];
  [_fileMgr createDir:path];
  NSLog(@"----------------------%@",path);
    return [path stringByAppendingPathComponent:@"index.ios.jsbundle"];
}





@end
