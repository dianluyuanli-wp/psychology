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
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
            var requsetOptions = __assign({}, config, options);
            return dispatchRequest(requsetOptions);
        };
        this.instance = null;
        this.config = {};
    }
    Axios.prototype.create = function (instanceConfig) {
        var config = this.config;
        this.config = __assign({}, config, instanceConfig);
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
        wx.request(__assign({}, config, { url: config.base + config.url, success: function (res) {
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
                case 0: return [4, request(__assign({ url: url, data: data }, options, { method: 'GET' }))];
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
                case 0: return [4, request(__assign({ url: url, data: data }, options, { method: 'POST' }))];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBTSxNQUFNLEdBQUcsbUNBQW1DLENBQUM7QUFFbkQ7SUFJSTtRQUFBLGlCQUdDO1FBb0JBLFlBQU8sR0FBRyxVQUFDLE9BQXVCO1lBQ3ZCLElBQUEscUJBQU0sQ0FBVTtZQUV4QixJQUFNLGNBQWMsZ0JBQ2hCLE1BQU0sRUFDTixPQUFPLENBQ1YsQ0FBQTtZQUNELE9BQU8sZUFBZSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzNDLENBQUMsQ0FBQTtRQTlCQSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQTtRQUNwQixJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBRUQsc0JBQU0sR0FBTixVQUFPLGNBQXNCO1FBQ3BCLElBQUEsb0JBQU0sQ0FBUztRQUV2QixJQUFJLENBQUMsTUFBTSxnQkFDUCxNQUFNLEVBQ04sY0FBYyxDQUNqQixDQUFBO1FBQ0QsT0FBTyxJQUFJLENBQUE7SUFDWixDQUFDO0lBR00saUJBQVcsR0FBbEI7UUFDQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNsQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksS0FBSyxFQUFFLENBQUE7U0FDNUI7UUFDRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUE7SUFDckIsQ0FBQztJQVdMLFlBQUM7QUFBRCxDQUFDLEFBcENELElBb0NDO0FBRUQsSUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBT2xDLElBQU0sZUFBZSxHQUFHLFVBQVMsTUFBc0I7SUFDbkQsT0FBTyxJQUFJLE9BQU8sQ0FBaUQsVUFBQyxPQUFPLEVBQUUsTUFBTTtRQUNsRixFQUFFLENBQUMsT0FBTyxjQUNOLE1BQU0sSUFDVCxHQUFHLEVBQUUsTUFBTSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsR0FBRyxFQUM3QixPQUFPLEVBQUUsVUFBQyxHQUFtRDtnQkFDNUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ2IsQ0FBQyxFQUNELElBQUksRUFBRSxVQUFBLEdBQUc7Z0JBQ1IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ1osQ0FBQyxJQUNBLENBQUE7SUFDSCxDQUFDLENBQUMsQ0FBQTtBQUNOLENBQUMsQ0FBQTtBQUVELElBQU0sUUFBUSxHQUFHLFVBQUMsTUFBVztJQUFYLHVCQUFBLEVBQUEsV0FBVztJQUN6QixPQUFPLEtBQUssQ0FBQyxNQUFNLFlBQ2YsSUFBSSxFQUFFLE1BQU0sSUFDVCxNQUFNLEVBQ1gsQ0FBQTtBQUNOLENBQUMsQ0FBQTtBQVlELFNBQXNCLE1BQU0sQ0FBQyxHQUFXLEVBQUUsSUFBYSxFQUFFLE9BQWdCOzs7Ozt3QkFDekQsV0FBTSxPQUFPLFlBQUcsR0FBRyxLQUFBLEVBQUUsSUFBSSxNQUFBLElBQUssT0FBTyxJQUFFLE1BQU0sRUFBRSxLQUFLLElBQUUsRUFBQTs7b0JBQTVELEdBQUcsR0FBRyxTQUFzRDtvQkFDbEUsV0FBTyxHQUFHLEVBQUM7Ozs7Q0FDZDtBQUhELHdCQUdDO0FBRUQsU0FBc0IsT0FBTyxDQUFDLEdBQVcsRUFBRSxJQUFhLEVBQUUsT0FBZ0I7Ozs7O3dCQUMxRCxXQUFNLE9BQU8sWUFBRyxHQUFHLEtBQUEsRUFBRSxJQUFJLE1BQUEsSUFBSyxPQUFPLElBQUUsTUFBTSxFQUFFLE1BQU0sSUFBRSxFQUFBOztvQkFBN0QsR0FBRyxHQUFHLFNBQXVEO29CQUNuRSxXQUFPLEdBQUcsRUFBQzs7OztDQUNkO0FBSEQsMEJBR0M7QUFFRCxTQUFzQixPQUFPLENBQUMsT0FBcUI7Ozs7OztvQkFDdkMsVUFBVSxHQUF3QixPQUFPLFdBQS9CLEVBQUUsR0FBRyxHQUFtQixPQUFPLElBQTFCLEVBQUUsTUFBTSxHQUFXLE9BQU8sT0FBbEIsRUFBRSxJQUFJLEdBQUssT0FBTyxLQUFaLENBQVk7Ozs7b0JBR3BDLFdBQU0sUUFBUSxDQUFDLFVBQVUsQ0FBQzs2QkFDOUIsT0FBTyxDQUFDOzRCQUNMLEdBQUcsS0FBQTs0QkFDSCxNQUFNLEVBQUUsTUFBTSxJQUFJLEtBQUs7NEJBQ3ZCLElBQUksTUFBQTt5QkFDUCxDQUFDLEVBQUE7O29CQUxOLE1BQU0sR0FBRyxTQUtILENBQUE7b0JBQ04sT0FBTyxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUMzQyxXQUFPLE1BQU0sQ0FBQyxJQUFJLEVBQUM7OztvQkFFbkIsSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFO3dCQUNmLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBRyxDQUFDLENBQUE7cUJBQ3JCO3lCQUFNO3FCQUVOO29CQUNELFdBQU8sS0FBRyxFQUFDOzs7OztDQUdsQjtBQXJCRCwwQkFxQkMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBkb21haW4gPSAnaHR0cDovL3RhbmdzaGlzYW5iYWlzaG91Lnh5ei9hcGkvJztcclxuXHJcbmNsYXNzIEF4aW9zIHtcclxuICAgIGluc3RhbmNlOiBBeGlvcyB8IG51bGw7XHJcbiAgICBjb25maWc6IG9iamVjdDtcclxuICAgIHN0YXRpYyBpbnN0YW5jZTogQXhpb3MgfCBudWxsO1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgdGhpcy5pbnN0YW5jZSA9IG51bGwgLy8g57G755qE5a6e5L6LXHJcbiAgICAgdGhpcy5jb25maWcgPSB7fTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgY3JlYXRlKGluc3RhbmNlQ29uZmlnOiBvYmplY3QpIHtcclxuICAgICBjb25zdCB7IGNvbmZpZyB9ID0gdGhpc1xyXG4gICAgIC8vIOWIm+W7uuWunuS+i+eahOaXtuWAmea3u+WKoOWfuuacrOmFjee9rlxyXG4gICAgIHRoaXMuY29uZmlnID0ge1xyXG4gICAgICAuLi5jb25maWcsXHJcbiAgICAgIC4uLmluc3RhbmNlQ29uZmlnXHJcbiAgICAgfVxyXG4gICAgIHJldHVybiB0aGlzXHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vIOWNleS+i1xyXG4gICAgc3RhdGljIGdldEluc3RhbmNlKCkge1xyXG4gICAgIGlmICghdGhpcy5pbnN0YW5jZSkge1xyXG4gICAgICAgdGhpcy5pbnN0YW5jZSA9IG5ldyBBeGlvcygpXHJcbiAgICAgfVxyXG4gICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICB9XHJcblxyXG4gICAgIHJlcXVlc3QgPSAob3B0aW9uczogZGlzcGF0Y2hSZXFPYmopID0+IHtcclxuICAgICAgICBjb25zdCB7IGNvbmZpZyB9ID0gdGhpcztcclxuICAgICAgICAvLyDlrp7kvovor7fmsYLnmoTml7blgJnmt7vliqDln7rmnKzphY3nva5cclxuICAgICAgICBjb25zdCByZXF1c2V0T3B0aW9ucyA9IHtcclxuICAgICAgICAgLi4uY29uZmlnLFxyXG4gICAgICAgICAuLi5vcHRpb25zXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBkaXNwYXRjaFJlcXVlc3QocmVxdXNldE9wdGlvbnMpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBheGlvcyA9IEF4aW9zLmdldEluc3RhbmNlKCk7XHJcblxyXG5pbnRlcmZhY2UgZGlzcGF0Y2hSZXFPYmoge1xyXG4gICAgYmFzZT86IG9iamVjdCxcclxuICAgIHVybDogc3RyaW5nLFxyXG4gICAgW3Byb3BOYW1lOiBzdHJpbmddOiBhbnk7XHJcbn1cclxuY29uc3QgZGlzcGF0Y2hSZXF1ZXN0ID0gZnVuY3Rpb24oY29uZmlnOiBkaXNwYXRjaFJlcU9iaikge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPFdlY2hhdE1pbmlwcm9ncmFtLlJlcXVlc3RTdWNjZXNzQ2FsbGJhY2tSZXN1bHQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgLi4uY29uZmlnLFxyXG4gICAgICB1cmw6IGNvbmZpZy5iYXNlICsgY29uZmlnLnVybCxcclxuICAgICAgc3VjY2VzczogKHJlczogV2VjaGF0TWluaXByb2dyYW0uUmVxdWVzdFN1Y2Nlc3NDYWxsYmFja1Jlc3VsdCkgPT4ge1xyXG4gICAgICAgcmVzb2x2ZShyZXMpXHJcbiAgICAgIH0sXHJcbiAgICAgIGZhaWw6IHJlcyA9PiB7XHJcbiAgICAgICByZWplY3QocmVzKVxyXG4gICAgICB9XHJcbiAgICAgfSlcclxuICAgIH0pXHJcbn1cclxuXHJcbmNvbnN0IGluc3RhbmNlID0gKGNvbmZpZyA9IHt9KSA9PiB7XHJcbiAgICByZXR1cm4gYXhpb3MuY3JlYXRlKHtcclxuICAgICAgICBiYXNlOiBkb21haW4sXHJcbiAgICAgICAgLi4uY29uZmlnXHJcbiAgICB9KVxyXG59XHJcblxyXG5pbnRlcmZhY2UgcmVxT3B0aW9uT2JqIHtcclxuICAgIGJhc2VDb25maWc/OiBPYmplY3QsXHJcbiAgICB1cmw6IHN0cmluZyxcclxuICAgIG1ldGhvZDogc3RyaW5nLFxyXG4gICAgZGF0YT86IE9iamVjdCxcclxuICAgIGlzTG9naW4/OiBib29sZWFuLFxyXG4gICAgc3VjY2Vzcz86IEZ1bmN0aW9uLFxyXG4gICAgZXJyb3I/OiBGdW5jdGlvblxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVxR2V0KHVybDogc3RyaW5nLCBkYXRhPzogT2JqZWN0LCBvcHRpb25zPzogT2JqZWN0KSB7XHJcbiAgICBjb25zdCByZXMgPSBhd2FpdCByZXF1ZXN0KHsgdXJsLCBkYXRhLCAuLi5vcHRpb25zLCBtZXRob2Q6ICdHRVQnfSk7XHJcbiAgICByZXR1cm4gcmVzO1xyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVxUG9zdCh1cmw6IHN0cmluZywgZGF0YT86IE9iamVjdCwgb3B0aW9ucz86IE9iamVjdCkge1xyXG4gICAgY29uc3QgcmVzID0gYXdhaXQgcmVxdWVzdCh7IHVybCwgZGF0YSwgLi4ub3B0aW9ucywgbWV0aG9kOiAnUE9TVCd9KTtcclxuICAgIHJldHVybiByZXM7XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZXF1ZXN0KG9wdGlvbnM6IHJlcU9wdGlvbk9iaikge1xyXG4gICAgY29uc3QgeyBiYXNlQ29uZmlnLCB1cmwsIG1ldGhvZCwgZGF0YSB9ID0gb3B0aW9uc1xyXG4gICAgbGV0IHJlc3VsdDogV2VjaGF0TWluaXByb2dyYW0uUmVxdWVzdFN1Y2Nlc3NDYWxsYmFja1Jlc3VsdDtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgcmVzdWx0ID0gYXdhaXQgaW5zdGFuY2UoYmFzZUNvbmZpZylcclxuICAgICAgICAgICAgLnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgdXJsLFxyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiBtZXRob2QgfHwgJ0dFVCcsXHJcbiAgICAgICAgICAgICAgICBkYXRhXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgb3B0aW9ucy5zdWNjZXNzICYmIG9wdGlvbnMuc3VjY2VzcyhyZXN1bHQpO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgIH0gY2F0Y2goZXJyKSB7XHJcbiAgICAgICAgaWYgKG9wdGlvbnMuZXJyb3IpIHtcclxuICAgICAgICAgICAgb3B0aW9ucy5lcnJvcihlcnIpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy9lcnJBbGVydCgpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBlcnI7XHJcbiAgICB9XHJcbiAgICBcclxufSJdfQ==