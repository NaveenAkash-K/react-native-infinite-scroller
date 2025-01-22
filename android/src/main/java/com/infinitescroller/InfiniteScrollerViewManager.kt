package com.infinitescroller

import android.graphics.Color
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.viewmanagers.InfiniteScrollerViewManagerInterface
import com.facebook.react.viewmanagers.InfiniteScrollerViewManagerDelegate

@ReactModule(name = InfiniteScrollerViewManager.NAME)
class InfiniteScrollerViewManager : SimpleViewManager<InfiniteScrollerView>(),
  InfiniteScrollerViewManagerInterface<InfiniteScrollerView> {
  private val mDelegate: ViewManagerDelegate<InfiniteScrollerView>

  init {
    mDelegate = InfiniteScrollerViewManagerDelegate(this)
  }

  override fun getDelegate(): ViewManagerDelegate<InfiniteScrollerView>? {
    return mDelegate
  }

  override fun getName(): String {
    return NAME
  }

  public override fun createViewInstance(context: ThemedReactContext): InfiniteScrollerView {
    return InfiniteScrollerView(context)
  }

  @ReactProp(name = "color")
  override fun setColor(view: InfiniteScrollerView?, color: String?) {
    view?.setBackgroundColor(Color.parseColor(color))
  }

  companion object {
    const val NAME = "InfiniteScrollerView"
  }
}
