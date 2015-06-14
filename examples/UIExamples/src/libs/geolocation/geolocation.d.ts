declare module lark {
    /**
     * @language en_US
     * The Geolocation able to obtain the position of the device.
     * Geolocation will emit CHANGE event when the device's location is changed.
     * It will emit IO_ERROR event if the location request is denied
     * or there is no location service on the device.
     *
     * @event lark.Event.CHANGE The device's location is changed
     * @event lark.Event.IO_ERROR Error occurred while getting the location
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * Geolocation 能够从设备的定位服务获取设备的当前位置。
     * 当设备的位置发生改变时 Geolocation 会派发 CHANGE 事件。
     * 当定位请求被拒绝或该设备没有定位服务时 Geolocation 会派发 IO_ERROR 事件。
     *
     * @event lark.Event.CHANGE 设备位置发生改变
     * @event lark.Event.IO_ERROR 获取设备位置时发生错误
     * @version Lark 1.0
     * @platform Web,Native
     */
    interface Geolocation extends IEventEmitter {
        /**
         * @language en_US
         * Start to monitor the device's location
         * @returns
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 开始监听设备位置信息
         * @returns
         * @version Lark 1.0
         * @platform Web,Native
         */
        start(): void;
        /**
         * @language en_US
         * Stop monitor the device's location
         * @returns
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 停止监听设备位置信息
         * @returns
         * @version Lark 1.0
         * @platform Web,Native
         */
        stop(): void;
    }
    /**
     * @copy lark.Geolocation
     */
    var Geolocation: {
        new (): Geolocation;
    };
    /**
     * @language en_US
     * The GeolocationEvent represents the position and altitude of the device on Earth,
     * and show errors occurred while getting the location of the device.
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * GeolocationEvent 提供设备的地理位置信息和获取位置时发生的错误信息
     * @version Lark 1.0
     * @platform Web,Native
     */
    class GeolocationEvent extends Event {
        /**
         * @language en_US
         * The acquisition of the location information failed because of app don't have permission.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 由于用户拒绝访问位置信息，获取位置信息失败
         * @version Lark 1.0
         * @platform Web,Native
         */
        static PERMISSION_DENIED: string;
        /**
         * @language en_US
         * The acquisition of the location failed because at least one internal source of position returned an internal error.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 设备位置服务不可用或者超时等原因没有得到位置信息
         * @version Lark 1.0
         * @platform Web,Native
         */
        static UNAVAILABLE: string;
        /**
         * @language en_US
         * The position's longitude in decimal degrees.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 当前位置的经度信息
         * @version Lark 1.0
         * @platform Web,Native
         */
        longitude: number;
        /**
         * @language en_US
         * The position's latitude in decimal degrees.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 当前位置的纬度信息
         * @version Lark 1.0
         * @platform Web,Native
         */
        latitude: number;
        /**
         * @language en_US
         * The velocity of the device in meters per second. This value can be null.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 当前设备的速度 单位是 米/秒，这个值可能为 null
         * @version Lark 1.0
         * @platform Web,Native
         */
        speed: number;
        /**
         * @language en_US
         * The direction in which the device is traveling. This value, specified in degrees,
         * indicates how far off from heading due north the device is. 0 degrees represents
         * true true north, and the direction is determined clockwise (which means that east
         * is 90 degrees and west is 270 degrees). If speed is 0, heading is NaN. If the
         * device is unable to provide heading information, this value is null.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 表示设备正在前进的方向，单位是度。heading 表示从正北开始顺时针旋转到当前方向的角度，
         * 比如正东是 90 度，正西是 270 度，如果 speed 是 0，heading 为 NaN。
         * @version Lark 1.0
         * @platform Web,Native
         */
        heading: number;
        /**
         * @language en_US
         * The position's altitude in metres, relative to sea level.
         * This value can be null if the implementation cannot provide the data.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 该位置的海拔信息，如果设备没有实现这个属性时，这个值有可能为 null
         * @version Lark 1.0
         * @platform Web,Native
         */
        altitude: number;
        /**
         * @language en_US
         * The accuracy of the latitude and longitude properties, expressed in meters.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 经纬度的准确性，单位是米
         * @version Lark 1.0
         * @platform Web,Native
         */
        accuracy: number;
        /**
         * @language en_US
         * The accuracy of the altitude expressed in meters. This value can be null.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 该位置海拔信息的准确性，单位是米，这个值有可能为 null
         * @version Lark 1.0
         * @platform Web,Native
         */
        altitudeAccuracy: number;
        /**
         * @language en_US
         * The type of error occurred while get the location of the device. The value could be:
         * @see lark.GeolocationEvent.PERMISSION_DENIED
         * @see lark.GeolocationEvent.UNAVAILABLE
         *
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 获取位置信息错误时的错误类型。值可能为：
         * @see lark.GeolocationEvent.PERMISSION_DENIED
         * @see lark.GeolocationEvent.UNAVAILABLE
         *
         * @version Lark 1.0
         * @platform Web,Native
         */
        errorType: string;
        /**
         * @language en_US
         * The error message occurred while get the location of the device.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 获取位置信息错误的错误信息
         * @version Lark 1.0
         * @platform Web,Native
         */
        errorMessage: string;
    }
}
declare module lark {
}
declare module lark {
}