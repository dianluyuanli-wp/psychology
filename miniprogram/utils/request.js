"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var domain = 'http://tangshisanbaishou.xyz/api/';
var Axios = (function () {
    function Axios() {
        var _this = this;
        this.request = function (options) {
            var config = _this.config;
            var requsetOptions = __assign(__assign({}, config), options);
            return dispatchRequest(requsetOptions);
        };
        this.instance = null;
        this.config = {};
    }
    Axios.prototype.create = function (instanceConfig) {
        var config = this.config;
        this.config = __assign(__assign({}, config), instanceConfig);
        return this;
    };
    Axios.getInstance = function () {
        if (!this.instance) {
            this.instance = new Axios();
        }
        return this.instance;
    };
    return Axios;
}());
var axios = Axios.getInstance();
var dispatchRequest = function (config) {
    return new Promise(function (resolve, reject) {
        wx.request(__assign(__assign({}, config), { url: config.base + config.url, success: function (res) {
                resolve(res);
            }, fail: function (res) {
                reject(res);
            } }));
    });
};
var instance = function (config) {
    if (config === void 0) { config = {}; }
    return axios.create(__assign({ base: domain }, config));
};
function reqGet(url, data, options) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, request(__assign(__assign({ url: url, data: data }, options), { method: 'GET' }))];
                case 1:
                    res = _a.sent();
                    return [2, res];
            }
        });
    });
}
exports.reqGet = reqGet;
function reqPost(url, data, options) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, request(__assign(__assign({ url: url, data: data }, options), { method: 'POST' }))];
                case 1:
                    res = _a.sent();
                    return [2, res];
            }
        });
    });
}
exports.reqPost = reqPost;
function request(options) {
    return __awaiter(this, void 0, void 0, function () {
        var baseConfig, url, method, data, result, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    baseConfig = options.baseConfig, url = options.url, method = options.method, data = options.data;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4, instance(baseConfig)
                            .request({
                            url: url,
                            method: method || 'GET',
                            data: data
                        })];
                case 2:
                    result = _a.sent();
                    options.success && options.success(result);
                    return [2, result.data];
                case 3:
                    err_1 = _a.sent();
                    if (options.error) {
                        options.error(err_1);
                    }
                    else {
                    }
                    return [2, err_1];
                case 4: return [2];
            }
        });
    });
}
exports.request = request;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQU0sTUFBTSxHQUFHLG1DQUFtQyxDQUFDO0FBRW5EO0lBSUk7UUFBQSxpQkFHQztRQW9CQSxZQUFPLEdBQUcsVUFBQyxPQUF1QjtZQUN2QixJQUFBLHFCQUFNLENBQVU7WUFFeEIsSUFBTSxjQUFjLHlCQUNoQixNQUFNLEdBQ04sT0FBTyxDQUNWLENBQUE7WUFDRCxPQUFPLGVBQWUsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUMzQyxDQUFDLENBQUE7UUE5QkEsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUE7UUFDcEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDbEIsQ0FBQztJQUVELHNCQUFNLEdBQU4sVUFBTyxjQUFzQjtRQUNwQixJQUFBLG9CQUFNLENBQVM7UUFFdkIsSUFBSSxDQUFDLE1BQU0seUJBQ1AsTUFBTSxHQUNOLGNBQWMsQ0FDakIsQ0FBQTtRQUNELE9BQU8sSUFBSSxDQUFBO0lBQ1osQ0FBQztJQUdNLGlCQUFXLEdBQWxCO1FBQ0MsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDbEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFBO1NBQzVCO1FBQ0QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFBO0lBQ3JCLENBQUM7SUFXTCxZQUFDO0FBQUQsQ0FBQyxBQXBDRCxJQW9DQztBQUVELElBQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQU9sQyxJQUFNLGVBQWUsR0FBRyxVQUFTLE1BQXNCO0lBQ25ELE9BQU8sSUFBSSxPQUFPLENBQWlELFVBQUMsT0FBTyxFQUFFLE1BQU07UUFDbEYsRUFBRSxDQUFDLE9BQU8sdUJBQ04sTUFBTSxLQUNULEdBQUcsRUFBRSxNQUFNLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxHQUFHLEVBQzdCLE9BQU8sRUFBRSxVQUFDLEdBQW1EO2dCQUM1RCxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDYixDQUFDLEVBQ0QsSUFBSSxFQUFFLFVBQUEsR0FBRztnQkFDUixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDWixDQUFDLElBQ0EsQ0FBQTtJQUNILENBQUMsQ0FBQyxDQUFBO0FBQ04sQ0FBQyxDQUFBO0FBRUQsSUFBTSxRQUFRLEdBQUcsVUFBQyxNQUFXO0lBQVgsdUJBQUEsRUFBQSxXQUFXO0lBQ3pCLE9BQU8sS0FBSyxDQUFDLE1BQU0sWUFDZixJQUFJLEVBQUUsTUFBTSxJQUNULE1BQU0sRUFDWCxDQUFBO0FBQ04sQ0FBQyxDQUFBO0FBWUQsU0FBc0IsTUFBTSxDQUFDLEdBQVcsRUFBRSxJQUFhLEVBQUUsT0FBZ0I7Ozs7O3dCQUN6RCxXQUFNLE9BQU8scUJBQUcsR0FBRyxLQUFBLEVBQUUsSUFBSSxNQUFBLElBQUssT0FBTyxLQUFFLE1BQU0sRUFBRSxLQUFLLElBQUUsRUFBQTs7b0JBQTVELEdBQUcsR0FBRyxTQUFzRDtvQkFDbEUsV0FBTyxHQUFHLEVBQUM7Ozs7Q0FDZDtBQUhELHdCQUdDO0FBRUQsU0FBc0IsT0FBTyxDQUFDLEdBQVcsRUFBRSxJQUFhLEVBQUUsT0FBZ0I7Ozs7O3dCQUMxRCxXQUFNLE9BQU8scUJBQUcsR0FBRyxLQUFBLEVBQUUsSUFBSSxNQUFBLElBQUssT0FBTyxLQUFFLE1BQU0sRUFBRSxNQUFNLElBQUUsRUFBQTs7b0JBQTdELEdBQUcsR0FBRyxTQUF1RDtvQkFDbkUsV0FBTyxHQUFHLEVBQUM7Ozs7Q0FDZDtBQUhELDBCQUdDO0FBRUQsU0FBc0IsT0FBTyxDQUFDLE9BQXFCOzs7Ozs7b0JBQ3ZDLFVBQVUsR0FBd0IsT0FBTyxXQUEvQixFQUFFLEdBQUcsR0FBbUIsT0FBTyxJQUExQixFQUFFLE1BQU0sR0FBVyxPQUFPLE9BQWxCLEVBQUUsSUFBSSxHQUFLLE9BQU8sS0FBWixDQUFZOzs7O29CQUdwQyxXQUFNLFFBQVEsQ0FBQyxVQUFVLENBQUM7NkJBQzlCLE9BQU8sQ0FBQzs0QkFDTCxHQUFHLEtBQUE7NEJBQ0gsTUFBTSxFQUFFLE1BQU0sSUFBSSxLQUFLOzRCQUN2QixJQUFJLE1BQUE7eUJBQ1AsQ0FBQyxFQUFBOztvQkFMTixNQUFNLEdBQUcsU0FLSCxDQUFBO29CQUNOLE9BQU8sQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDM0MsV0FBTyxNQUFNLENBQUMsSUFBSSxFQUFDOzs7b0JBRW5CLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRTt3QkFDZixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUcsQ0FBQyxDQUFBO3FCQUNyQjt5QkFBTTtxQkFFTjtvQkFDRCxXQUFPLEtBQUcsRUFBQzs7Ozs7Q0FHbEI7QUFyQkQsMEJBcUJDIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZG9tYWluID0gJ2h0dHA6Ly90YW5nc2hpc2FuYmFpc2hvdS54eXovYXBpLyc7XHJcblxyXG5jbGFzcyBBeGlvcyB7XHJcbiAgICBpbnN0YW5jZTogQXhpb3MgfCBudWxsO1xyXG4gICAgY29uZmlnOiBvYmplY3Q7XHJcbiAgICBzdGF0aWMgaW5zdGFuY2U6IEF4aW9zIHwgbnVsbDtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgIHRoaXMuaW5zdGFuY2UgPSBudWxsIC8vIOexu+eahOWunuS+i1xyXG4gICAgIHRoaXMuY29uZmlnID0ge307XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNyZWF0ZShpbnN0YW5jZUNvbmZpZzogb2JqZWN0KSB7XHJcbiAgICAgY29uc3QgeyBjb25maWcgfSA9IHRoaXNcclxuICAgICAvLyDliJvlu7rlrp7kvovnmoTml7blgJnmt7vliqDln7rmnKzphY3nva5cclxuICAgICB0aGlzLmNvbmZpZyA9IHtcclxuICAgICAgLi4uY29uZmlnLFxyXG4gICAgICAuLi5pbnN0YW5jZUNvbmZpZ1xyXG4gICAgIH1cclxuICAgICByZXR1cm4gdGhpc1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvLyDljZXkvotcclxuICAgIHN0YXRpYyBnZXRJbnN0YW5jZSgpIHtcclxuICAgICBpZiAoIXRoaXMuaW5zdGFuY2UpIHtcclxuICAgICAgIHRoaXMuaW5zdGFuY2UgPSBuZXcgQXhpb3MoKVxyXG4gICAgIH1cclxuICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgfVxyXG5cclxuICAgICByZXF1ZXN0ID0gKG9wdGlvbnM6IGRpc3BhdGNoUmVxT2JqKSA9PiB7XHJcbiAgICAgICAgY29uc3QgeyBjb25maWcgfSA9IHRoaXM7XHJcbiAgICAgICAgLy8g5a6e5L6L6K+35rGC55qE5pe25YCZ5re75Yqg5Z+65pys6YWN572uXHJcbiAgICAgICAgY29uc3QgcmVxdXNldE9wdGlvbnMgPSB7XHJcbiAgICAgICAgIC4uLmNvbmZpZyxcclxuICAgICAgICAgLi4ub3B0aW9uc1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZGlzcGF0Y2hSZXF1ZXN0KHJlcXVzZXRPcHRpb25zKTtcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgYXhpb3MgPSBBeGlvcy5nZXRJbnN0YW5jZSgpO1xyXG5cclxuaW50ZXJmYWNlIGRpc3BhdGNoUmVxT2JqIHtcclxuICAgIGJhc2U/OiBvYmplY3QsXHJcbiAgICB1cmw6IHN0cmluZyxcclxuICAgIFtwcm9wTmFtZTogc3RyaW5nXTogYW55O1xyXG59XHJcbmNvbnN0IGRpc3BhdGNoUmVxdWVzdCA9IGZ1bmN0aW9uKGNvbmZpZzogZGlzcGF0Y2hSZXFPYmopIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxXZWNoYXRNaW5pcHJvZ3JhbS5SZXF1ZXN0U3VjY2Vzc0NhbGxiYWNrUmVzdWx0PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgd3gucmVxdWVzdCh7XHJcbiAgICAgIC4uLmNvbmZpZyxcclxuICAgICAgdXJsOiBjb25maWcuYmFzZSArIGNvbmZpZy51cmwsXHJcbiAgICAgIHN1Y2Nlc3M6IChyZXM6IFdlY2hhdE1pbmlwcm9ncmFtLlJlcXVlc3RTdWNjZXNzQ2FsbGJhY2tSZXN1bHQpID0+IHtcclxuICAgICAgIHJlc29sdmUocmVzKVxyXG4gICAgICB9LFxyXG4gICAgICBmYWlsOiByZXMgPT4ge1xyXG4gICAgICAgcmVqZWN0KHJlcylcclxuICAgICAgfVxyXG4gICAgIH0pXHJcbiAgICB9KVxyXG59XHJcblxyXG5jb25zdCBpbnN0YW5jZSA9IChjb25maWcgPSB7fSkgPT4ge1xyXG4gICAgcmV0dXJuIGF4aW9zLmNyZWF0ZSh7XHJcbiAgICAgICAgYmFzZTogZG9tYWluLFxyXG4gICAgICAgIC4uLmNvbmZpZ1xyXG4gICAgfSlcclxufVxyXG5cclxuaW50ZXJmYWNlIHJlcU9wdGlvbk9iaiB7XHJcbiAgICBiYXNlQ29uZmlnPzogT2JqZWN0LFxyXG4gICAgdXJsOiBzdHJpbmcsXHJcbiAgICBtZXRob2Q6IHN0cmluZyxcclxuICAgIGRhdGE/OiBPYmplY3QsXHJcbiAgICBpc0xvZ2luPzogYm9vbGVhbixcclxuICAgIHN1Y2Nlc3M/OiBGdW5jdGlvbixcclxuICAgIGVycm9yPzogRnVuY3Rpb25cclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlcUdldCh1cmw6IHN0cmluZywgZGF0YT86IE9iamVjdCwgb3B0aW9ucz86IE9iamVjdCkge1xyXG4gICAgY29uc3QgcmVzID0gYXdhaXQgcmVxdWVzdCh7IHVybCwgZGF0YSwgLi4ub3B0aW9ucywgbWV0aG9kOiAnR0VUJ30pO1xyXG4gICAgcmV0dXJuIHJlcztcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlcVBvc3QodXJsOiBzdHJpbmcsIGRhdGE/OiBPYmplY3QsIG9wdGlvbnM/OiBPYmplY3QpIHtcclxuICAgIGNvbnN0IHJlcyA9IGF3YWl0IHJlcXVlc3QoeyB1cmwsIGRhdGEsIC4uLm9wdGlvbnMsIG1ldGhvZDogJ1BPU1QnfSk7XHJcbiAgICByZXR1cm4gcmVzO1xyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVxdWVzdChvcHRpb25zOiByZXFPcHRpb25PYmopIHtcclxuICAgIGNvbnN0IHsgYmFzZUNvbmZpZywgdXJsLCBtZXRob2QsIGRhdGEgfSA9IG9wdGlvbnNcclxuICAgIGxldCByZXN1bHQ6IFdlY2hhdE1pbmlwcm9ncmFtLlJlcXVlc3RTdWNjZXNzQ2FsbGJhY2tSZXN1bHQ7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHJlc3VsdCA9IGF3YWl0IGluc3RhbmNlKGJhc2VDb25maWcpXHJcbiAgICAgICAgICAgIC5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgIHVybCxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogbWV0aG9kIHx8ICdHRVQnLFxyXG4gICAgICAgICAgICAgICAgZGF0YVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIG9wdGlvbnMuc3VjY2VzcyAmJiBvcHRpb25zLnN1Y2Nlc3MocmVzdWx0KTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICB9IGNhdGNoKGVycikge1xyXG4gICAgICAgIGlmIChvcHRpb25zLmVycm9yKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMuZXJyb3IoZXJyKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vZXJyQWxlcnQoKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZXJyO1xyXG4gICAgfVxyXG4gICAgXHJcbn0iXX0=