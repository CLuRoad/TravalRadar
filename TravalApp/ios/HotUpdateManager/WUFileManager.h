//
//  WUFileManager.h
//  HotUpdateDemo
//
//  Created by RoadClu on 2017/7/13.
//  Copyright © 2017年 worldunion. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface WUFileManager : NSObject

- (BOOL)createDir:(NSString *)dir;

- (void)unzipFileAtPath:(NSString *)path
          toDestination:(NSString *)destination
        progressHandler:(void (^)(NSString *entry, long entryNumber, long total))progressHandler
      completionHandler:(void (^)(NSString *path, BOOL succeeded, NSError *error))completionHandler;

- (void)bsdiffFileAtPath:(NSString *)path
              fromOrigin:(NSString *)origin
           toDestination:(NSString *)destination
       completionHandler:(void (^)(BOOL success))completionHandler;

- (void)copyFiles:(NSDictionary *)filesDic
          fromDir:(NSString *)fromDir
            toDir:(NSString *)toDir
          deletes:(NSDictionary *)deletes
completionHandler:(void (^)(NSError *error))completionHandler;

- (void)removeFile:(NSString *)filePath
 completionHandler:(void (^)(NSError *error))completionHandler;

- (void)moveItemFromURL:(NSURL *)fromURL toPath:(NSString *)toPath completionHandler:(void (^)(NSError *error))completionHandler;
@end
