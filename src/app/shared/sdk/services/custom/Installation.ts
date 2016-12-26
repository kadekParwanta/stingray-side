/* tslint:disable */
import { Injectable, Inject, Optional } from '@angular/core';
import { Http, Response } from '@angular/http';
import { SDKModels } from './SDKModels';
import { BaseLoopBackApi } from '../core/base.service';
import { LoopBackConfig } from '../../lb.config';
import { LoopBackAuth } from '../core/auth.service';
import { LoopBackFilter,  } from '../../models/BaseModels';
import { JSONSearchParams } from '../core/search.params';
import { ErrorHandler } from '../core/error.service';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Installation } from '../../models/Installation';
import { SocketConnections } from '../../sockets/socket.connections';


/**
 * Api services for the `Installation` model.
 */
@Injectable()
export class InstallationApi extends BaseLoopBackApi {

  constructor(
    @Inject(Http) protected http: Http,
    @Inject(SocketConnections) protected connections: SocketConnections,
    @Inject(SDKModels) protected models: SDKModels,
    @Inject(LoopBackAuth) protected auth: LoopBackAuth,
    @Inject(JSONSearchParams) protected searchParams: JSONSearchParams,
    @Optional() @Inject(ErrorHandler) protected errorHandler: ErrorHandler
  ) {
    super(http,  connections,  models, auth, searchParams, errorHandler);
  }

  /**
   * Find installations by application id
   *
   * @param string deviceType Device type
   *
   * @param string appId Application id
   *
   * @param string appVersion Application version
   *
   * @returns object An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Installation` object.)
   * </em>
   */
  public findByApp(deviceType: any = {}, appId: any = {}, appVersion: any = {}): Observable<Installation> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/installations/byApp";
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    if (deviceType) _urlParams.deviceType = deviceType;
    if (appId) _urlParams.appId = appId;
    if (appVersion) _urlParams.appVersion = appVersion;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
    return result.map((instance: Installation) => new Installation(instance));
  }

  /**
   * Find installations by user id
   *
   * @param string deviceType Device type
   *
   * @param string userId User id
   *
   * @returns object An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Installation` object.)
   * </em>
   */
  public findByUser(deviceType: any = {}, userId: any = {}): Observable<Installation> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/installations/byUser";
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    if (deviceType) _urlParams.deviceType = deviceType;
    if (userId) _urlParams.userId = userId;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
    return result.map((instance: Installation) => new Installation(instance));
  }

  /**
   * Find installations by subscriptions
   *
   * @param string deviceType Device type
   *
   * @param string subscriptions Subscriptions
   *
   * @returns object An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Installation` object.)
   * </em>
   */
  public findBySubscriptions(deviceType: any = {}, subscriptions: any = {}): Observable<Installation> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/installations/bySubscriptions";
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    if (deviceType) _urlParams.deviceType = deviceType;
    if (subscriptions) _urlParams.subscriptions = subscriptions;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
    return result.map((instance: Installation) => new Installation(instance));
  }

  /**
   * The name of the model represented by this $resource,
   * i.e. `Installation`.
   */
  public getModelName() {
    return "Installation";
  }
}
