/**
 * @fileoverview This file is generated by the Angular 2 template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties}
 */
 /* tslint:disable */

import * as import0 from '@angular/core/src/linker/ng_module_factory';
import * as import1 from './ng2grid.module';
import * as import2 from '@angular/common/src/common_module';
import * as import3 from '@angular/core/src/application_module';
import * as import4 from '@angular/platform-browser/src/browser';
import * as import5 from '@angular/http/src/http_module';
import * as import6 from '@angular/common/src/localization';
import * as import7 from '@angular/core/src/application_init';
import * as import8 from '@angular/core/src/testability/testability';
import * as import9 from '@angular/core/src/application_ref';
import * as import10 from '@angular/core/src/linker/compiler';
import * as import11 from '@angular/platform-browser/src/dom/events/hammer_gestures';
import * as import12 from '@angular/platform-browser/src/dom/events/event_manager';
import * as import13 from '@angular/platform-browser/src/dom/shared_styles_host';
import * as import14 from '@angular/platform-browser/src/dom/dom_renderer';
import * as import15 from '@angular/platform-browser/src/security/dom_sanitization_service';
import * as import16 from '@angular/core/src/linker/view_utils';
import * as import17 from '@angular/platform-browser/src/browser/title';
import * as import18 from '@angular/http/src/backends/browser_xhr';
import * as import19 from '@angular/http/src/base_response_options';
import * as import20 from '@angular/http/src/backends/xhr_backend';
import * as import21 from '@angular/http/src/base_request_options';
import * as import22 from '@angular/core/src/di/injector';
import * as import23 from '@angular/core/src/application_tokens';
import * as import24 from '@angular/platform-browser/src/dom/events/dom_events';
import * as import25 from '@angular/platform-browser/src/dom/events/key_events';
import * as import26 from '@angular/core/src/zone/ng_zone';
import * as import27 from '@angular/platform-browser/src/dom/debug/ng_probe';
import * as import28 from '@angular/core/src/console';
import * as import29 from '@angular/core/src/i18n/tokens';
import * as import30 from '@angular/core/src/error_handler';
import * as import31 from '@angular/platform-browser/src/dom/dom_tokens';
import * as import32 from '@angular/platform-browser/src/dom/animation_driver';
import * as import33 from '@angular/core/src/render/api';
import * as import34 from '@angular/core/src/security';
import * as import35 from '@angular/core/src/change_detection/differs/iterable_differs';
import * as import36 from '@angular/core/src/change_detection/differs/keyvalue_differs';
import * as import37 from '@angular/http/src/interfaces';
import * as import38 from '@angular/http/src/http';
class Ng2GridModuleInjector extends import0.NgModuleInjector<import1.Ng2GridModule> {
  _CommonModule_0:import2.CommonModule;
  _ApplicationModule_1:import3.ApplicationModule;
  _BrowserModule_2:import4.BrowserModule;
  _HttpModule_3:import5.HttpModule;
  _Ng2GridModule_4:import1.Ng2GridModule;
  __LOCALE_ID_5:any;
  __NgLocalization_6:import6.NgLocaleLocalization;
  _ErrorHandler_7:any;
  _ApplicationInitStatus_8:import7.ApplicationInitStatus;
  _Testability_9:import8.Testability;
  _ApplicationRef__10:import9.ApplicationRef_;
  __ApplicationRef_11:any;
  __Compiler_12:import10.Compiler;
  __APP_ID_13:any;
  __DOCUMENT_14:any;
  __HAMMER_GESTURE_CONFIG_15:import11.HammerGestureConfig;
  __EVENT_MANAGER_PLUGINS_16:any[];
  __EventManager_17:import12.EventManager;
  __DomSharedStylesHost_18:import13.DomSharedStylesHost;
  __AnimationDriver_19:any;
  __DomRootRenderer_20:import14.DomRootRenderer_;
  __RootRenderer_21:any;
  __DomSanitizer_22:import15.DomSanitizerImpl;
  __Sanitizer_23:any;
  __ViewUtils_24:import16.ViewUtils;
  __IterableDiffers_25:any;
  __KeyValueDiffers_26:any;
  __SharedStylesHost_27:any;
  __Title_28:import17.Title;
  __BrowserXhr_29:import18.BrowserXhr;
  __ResponseOptions_30:import19.BaseResponseOptions;
  __XSRFStrategy_31:any;
  __XHRBackend_32:import20.XHRBackend;
  __RequestOptions_33:import21.BaseRequestOptions;
  __Http_34:any;
  constructor(parent:import22.Injector) {
    super(parent,([] as any[]),([] as any[]));
  }
  get _LOCALE_ID_5():any {
    if ((this.__LOCALE_ID_5 == null)) { (this.__LOCALE_ID_5 = 'en-US'); }
    return this.__LOCALE_ID_5;
  }
  get _NgLocalization_6():import6.NgLocaleLocalization {
    if ((this.__NgLocalization_6 == null)) { (this.__NgLocalization_6 = new import6.NgLocaleLocalization(this._LOCALE_ID_5)); }
    return this.__NgLocalization_6;
  }
  get _ApplicationRef_11():any {
    if ((this.__ApplicationRef_11 == null)) { (this.__ApplicationRef_11 = this._ApplicationRef__10); }
    return this.__ApplicationRef_11;
  }
  get _Compiler_12():import10.Compiler {
    if ((this.__Compiler_12 == null)) { (this.__Compiler_12 = new import10.Compiler()); }
    return this.__Compiler_12;
  }
  get _APP_ID_13():any {
    if ((this.__APP_ID_13 == null)) { (this.__APP_ID_13 = import23._appIdRandomProviderFactory()); }
    return this.__APP_ID_13;
  }
  get _DOCUMENT_14():any {
    if ((this.__DOCUMENT_14 == null)) { (this.__DOCUMENT_14 = import4._document()); }
    return this.__DOCUMENT_14;
  }
  get _HAMMER_GESTURE_CONFIG_15():import11.HammerGestureConfig {
    if ((this.__HAMMER_GESTURE_CONFIG_15 == null)) { (this.__HAMMER_GESTURE_CONFIG_15 = new import11.HammerGestureConfig()); }
    return this.__HAMMER_GESTURE_CONFIG_15;
  }
  get _EVENT_MANAGER_PLUGINS_16():any[] {
    if ((this.__EVENT_MANAGER_PLUGINS_16 == null)) { (this.__EVENT_MANAGER_PLUGINS_16 = [
      new import24.DomEventsPlugin(),
      new import25.KeyEventsPlugin(),
      new import11.HammerGesturesPlugin(this._HAMMER_GESTURE_CONFIG_15)
    ]
    ); }
    return this.__EVENT_MANAGER_PLUGINS_16;
  }
  get _EventManager_17():import12.EventManager {
    if ((this.__EventManager_17 == null)) { (this.__EventManager_17 = new import12.EventManager(this._EVENT_MANAGER_PLUGINS_16,this.parent.get(import26.NgZone))); }
    return this.__EventManager_17;
  }
  get _DomSharedStylesHost_18():import13.DomSharedStylesHost {
    if ((this.__DomSharedStylesHost_18 == null)) { (this.__DomSharedStylesHost_18 = new import13.DomSharedStylesHost(this._DOCUMENT_14)); }
    return this.__DomSharedStylesHost_18;
  }
  get _AnimationDriver_19():any {
    if ((this.__AnimationDriver_19 == null)) { (this.__AnimationDriver_19 = import4._resolveDefaultAnimationDriver()); }
    return this.__AnimationDriver_19;
  }
  get _DomRootRenderer_20():import14.DomRootRenderer_ {
    if ((this.__DomRootRenderer_20 == null)) { (this.__DomRootRenderer_20 = new import14.DomRootRenderer_(this._DOCUMENT_14,this._EventManager_17,this._DomSharedStylesHost_18,this._AnimationDriver_19,this._APP_ID_13)); }
    return this.__DomRootRenderer_20;
  }
  get _RootRenderer_21():any {
    if ((this.__RootRenderer_21 == null)) { (this.__RootRenderer_21 = import27._createConditionalRootRenderer(this._DomRootRenderer_20,this.parent.get(import27.NgProbeToken,(null as any)))); }
    return this.__RootRenderer_21;
  }
  get _DomSanitizer_22():import15.DomSanitizerImpl {
    if ((this.__DomSanitizer_22 == null)) { (this.__DomSanitizer_22 = new import15.DomSanitizerImpl()); }
    return this.__DomSanitizer_22;
  }
  get _Sanitizer_23():any {
    if ((this.__Sanitizer_23 == null)) { (this.__Sanitizer_23 = this._DomSanitizer_22); }
    return this.__Sanitizer_23;
  }
  get _ViewUtils_24():import16.ViewUtils {
    if ((this.__ViewUtils_24 == null)) { (this.__ViewUtils_24 = new import16.ViewUtils(this._RootRenderer_21,this._Sanitizer_23)); }
    return this.__ViewUtils_24;
  }
  get _IterableDiffers_25():any {
    if ((this.__IterableDiffers_25 == null)) { (this.__IterableDiffers_25 = import3._iterableDiffersFactory()); }
    return this.__IterableDiffers_25;
  }
  get _KeyValueDiffers_26():any {
    if ((this.__KeyValueDiffers_26 == null)) { (this.__KeyValueDiffers_26 = import3._keyValueDiffersFactory()); }
    return this.__KeyValueDiffers_26;
  }
  get _SharedStylesHost_27():any {
    if ((this.__SharedStylesHost_27 == null)) { (this.__SharedStylesHost_27 = this._DomSharedStylesHost_18); }
    return this.__SharedStylesHost_27;
  }
  get _Title_28():import17.Title {
    if ((this.__Title_28 == null)) { (this.__Title_28 = new import17.Title()); }
    return this.__Title_28;
  }
  get _BrowserXhr_29():import18.BrowserXhr {
    if ((this.__BrowserXhr_29 == null)) { (this.__BrowserXhr_29 = new import18.BrowserXhr()); }
    return this.__BrowserXhr_29;
  }
  get _ResponseOptions_30():import19.BaseResponseOptions {
    if ((this.__ResponseOptions_30 == null)) { (this.__ResponseOptions_30 = new import19.BaseResponseOptions()); }
    return this.__ResponseOptions_30;
  }
  get _XSRFStrategy_31():any {
    if ((this.__XSRFStrategy_31 == null)) { (this.__XSRFStrategy_31 = import5._createDefaultCookieXSRFStrategy()); }
    return this.__XSRFStrategy_31;
  }
  get _XHRBackend_32():import20.XHRBackend {
    if ((this.__XHRBackend_32 == null)) { (this.__XHRBackend_32 = new import20.XHRBackend(this._BrowserXhr_29,this._ResponseOptions_30,this._XSRFStrategy_31)); }
    return this.__XHRBackend_32;
  }
  get _RequestOptions_33():import21.BaseRequestOptions {
    if ((this.__RequestOptions_33 == null)) { (this.__RequestOptions_33 = new import21.BaseRequestOptions()); }
    return this.__RequestOptions_33;
  }
  get _Http_34():any {
    if ((this.__Http_34 == null)) { (this.__Http_34 = import5.httpFactory(this._XHRBackend_32,this._RequestOptions_33)); }
    return this.__Http_34;
  }
  createInternal():import1.Ng2GridModule {
    this._CommonModule_0 = new import2.CommonModule();
    this._ApplicationModule_1 = new import3.ApplicationModule();
    this._BrowserModule_2 = new import4.BrowserModule(this.parent.get(import4.BrowserModule,(null as any)));
    this._HttpModule_3 = new import5.HttpModule();
    this._Ng2GridModule_4 = new import1.Ng2GridModule();
    this._ErrorHandler_7 = import4.errorHandler();
    this._ApplicationInitStatus_8 = new import7.ApplicationInitStatus(this.parent.get(import7.APP_INITIALIZER,(null as any)));
    this._Testability_9 = new import8.Testability(this.parent.get(import26.NgZone));
    this._ApplicationRef__10 = new import9.ApplicationRef_(this.parent.get(import26.NgZone),this.parent.get(import28.Console),this,this._ErrorHandler_7,this,this._ApplicationInitStatus_8,this.parent.get(import8.TestabilityRegistry,(null as any)),this._Testability_9);
    return this._Ng2GridModule_4;
  }
  getInternal(token:any,notFoundResult:any):any {
    if ((token === import2.CommonModule)) { return this._CommonModule_0; }
    if ((token === import3.ApplicationModule)) { return this._ApplicationModule_1; }
    if ((token === import4.BrowserModule)) { return this._BrowserModule_2; }
    if ((token === import5.HttpModule)) { return this._HttpModule_3; }
    if ((token === import1.Ng2GridModule)) { return this._Ng2GridModule_4; }
    if ((token === import29.LOCALE_ID)) { return this._LOCALE_ID_5; }
    if ((token === import6.NgLocalization)) { return this._NgLocalization_6; }
    if ((token === import30.ErrorHandler)) { return this._ErrorHandler_7; }
    if ((token === import7.ApplicationInitStatus)) { return this._ApplicationInitStatus_8; }
    if ((token === import8.Testability)) { return this._Testability_9; }
    if ((token === import9.ApplicationRef_)) { return this._ApplicationRef__10; }
    if ((token === import9.ApplicationRef)) { return this._ApplicationRef_11; }
    if ((token === import10.Compiler)) { return this._Compiler_12; }
    if ((token === import23.APP_ID)) { return this._APP_ID_13; }
    if ((token === import31.DOCUMENT)) { return this._DOCUMENT_14; }
    if ((token === import11.HAMMER_GESTURE_CONFIG)) { return this._HAMMER_GESTURE_CONFIG_15; }
    if ((token === import12.EVENT_MANAGER_PLUGINS)) { return this._EVENT_MANAGER_PLUGINS_16; }
    if ((token === import12.EventManager)) { return this._EventManager_17; }
    if ((token === import13.DomSharedStylesHost)) { return this._DomSharedStylesHost_18; }
    if ((token === import32.AnimationDriver)) { return this._AnimationDriver_19; }
    if ((token === import14.DomRootRenderer)) { return this._DomRootRenderer_20; }
    if ((token === import33.RootRenderer)) { return this._RootRenderer_21; }
    if ((token === import15.DomSanitizer)) { return this._DomSanitizer_22; }
    if ((token === import34.Sanitizer)) { return this._Sanitizer_23; }
    if ((token === import16.ViewUtils)) { return this._ViewUtils_24; }
    if ((token === import35.IterableDiffers)) { return this._IterableDiffers_25; }
    if ((token === import36.KeyValueDiffers)) { return this._KeyValueDiffers_26; }
    if ((token === import13.SharedStylesHost)) { return this._SharedStylesHost_27; }
    if ((token === import17.Title)) { return this._Title_28; }
    if ((token === import18.BrowserXhr)) { return this._BrowserXhr_29; }
    if ((token === import19.ResponseOptions)) { return this._ResponseOptions_30; }
    if ((token === import37.XSRFStrategy)) { return this._XSRFStrategy_31; }
    if ((token === import20.XHRBackend)) { return this._XHRBackend_32; }
    if ((token === import21.RequestOptions)) { return this._RequestOptions_33; }
    if ((token === import38.Http)) { return this._Http_34; }
    return notFoundResult;
  }
  destroyInternal():void {
    this._ApplicationRef__10.ngOnDestroy();
  }
}
export const Ng2GridModuleNgFactory:import0.NgModuleFactory<import1.Ng2GridModule> = new import0.NgModuleFactory(Ng2GridModuleInjector,import1.Ng2GridModule);