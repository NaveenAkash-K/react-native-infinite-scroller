#import <React/RCTViewManager.h>
#import <React/RCTUIManager.h>
#import "RCTBridge.h"

@interface InfiniteScrollerViewManager : RCTViewManager
@end

@implementation InfiniteScrollerViewManager

RCT_EXPORT_MODULE(InfiniteScrollerView)

- (UIView *)view
{
  return [[UIView alloc] init];
}

RCT_EXPORT_VIEW_PROPERTY(color, NSString)

@end
