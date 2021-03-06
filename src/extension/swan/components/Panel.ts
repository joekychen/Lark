//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////


module swan {

    /**
     * @language en_US
     * The Panel class defines a container that includes a title bar,
     * a closeButton, a moveArea, and a content area for its children.
     *
     * @event swan.UIEvent.CLOSING Emitted when the close button is taped
     * you can use <code>event.preventDefault()</code> to prevent close.
     *
     * @version Lark 1.0
     * @version Swan 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * Panel 类定义一个容器，该容器为其子代提供标题栏、关闭按钮、可移动区域和内容区域。
     *
     * @event swan.UIEvent.CLOSING 面板即将关闭事件，在关闭按钮被点击后抛出，
     * 监听此事件并调用<code>event.preventDefault()</code>能够阻止面板被关闭。
     *
     * @version Lark 1.0
     * @version Swan 1.0
     * @platform Web,Native
     */
    export class Panel extends Component {

        /**
         * @language en_US
         * Constructor.
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 构造函数。
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public constructor() {
            super();
            this.on(lark.TouchEvent.TOUCH_BEGIN, this.onWindowTouchBegin, this, false, 100);
        }

        /**
         * @private
         * 在窗体上按下时前置窗口
         */
        private onWindowTouchBegin(event:lark.TouchEvent):void {
            this.$parent.addChild(this);
        }


        /**
         * @language en_US
         * [write-only] This property is Usually invoked in resolving an EXML for adding multiple children quickly.
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * [只写] 此属性通常在 EXML 的解析器中调用，便于快速添加多个子项。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public set elementsContent(value:lark.DisplayObject[]) {
            if (value) {
                var length = value.length;
                for (var i = 0; i < length; i++) {
                    this.addChild(value[i]);
                }
            }
        }

        /**
         * @language en_US
         * The skin part that defines the appearance of the close button.
         * When taped, the close button emits a <code>closing</code> event.
         *
         * @skinPart
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 关闭按钮
         *
         * @skinPart
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public closeButton:Button = null;

        /**
         * @language en_US
         * The area where the user must drag to move the window.
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 可移动区域
         *
         * @skinPart
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public moveArea:lark.DisplayObject = null;

        /**
         * @language en_US
         * The skin part that defines the appearance of the
         * title text in the container.
         *
         * @skinPart
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 标题显示对象
         *
         * @skinPart
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public titleDisplay:IDisplayText = null;

        /**
         * @private
         */
        private _title:string = "";

        /**
         * @language en_US
         * Title or caption displayed in the title bar.
         *
         * @default ""
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 标题栏中显示的标题。
         *
         * @default ""
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public get title():string {
            return this._title;
        }

        public set title(value:string) {
            this._title = value;
            if (this.titleDisplay)
                this.titleDisplay.text = this.title;
        }

        /**
         * @inheritDoc
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        protected partAdded(partName:string, instance:any):void {
            super.partAdded(partName, instance);
            if (instance == this.titleDisplay) {
                this.titleDisplay.text = this._title;
            }
            else if (instance == this.moveArea) {
                this.moveArea.on(lark.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            }
            else if (instance == this.closeButton) {
                this.closeButton.on(lark.TouchEvent.TOUCH_TAP, this.onCloseButtonClick, this);
            }
        }

        /**
         * @inheritDoc
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        protected partRemoved(partName:string, instance:any):void {
            super.partRemoved(partName, instance);
            if (instance == this.moveArea) {
                this.moveArea.removeListener(lark.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            }
            else if (instance == this.closeButton) {
                this.closeButton.removeListener(lark.TouchEvent.TOUCH_TAP, this.onCloseButtonClick, this);
            }
        }

        /**
         * @language en_US
         * Emites the "closing" event when the closeButton is clicked.
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 当 closeButton 被点击时派发 “closing” 事件
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        protected onCloseButtonClick(event:lark.TouchEvent):void {
            if (UIEvent.emitUIEvent(this, UIEvent.CLOSING)) {
                this.close();
            }
        }

        /**
         * @language en_US
         * Close the panel and remove from the parent container.
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 关闭面板，从父级容器移除自身。
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public close():void {
            if (!this.$parent) {
                return;
            }
            this.$parent.removeChild(this);
        }

        /**
         * @private
         * 触摸按下时的偏移量
         */
        private offsetPointX:number = 0;
        /**
         * @private
         */
        private offsetPointY:number = 0;

        /**
         * @language en_US
         * Called when the user starts dragging a Panel.
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 在可移动区域按下
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        protected onTouchBegin(event:lark.TouchEvent):void {
            this.$includeInLayout = false;
            this.offsetPointX = this.x - event.$stageX;
            this.offsetPointY = this.y - event.$stageY;
            this.$stage.on(lark.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            this.$stage.on(lark.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        }

        /**
         * @language en_US
         * Called when the user drags a Panel.
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 触摸拖拽时的移动事件
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        protected onTouchMove(event:lark.TouchEvent):void {
            this.x = event.$stageX + this.offsetPointX;
            this.y = event.$stageY + this.offsetPointY;
        }

        /**
         * @language en_US
         * Called when the user releases the Panel.
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 在舞台上弹起事件
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        protected onTouchEnd(event:lark.TouchEvent):void {
            this.$stage.removeListener(lark.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            this.$stage.removeListener(lark.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        }
    }

    registerProperty(Panel, "elementsContent", "Array", true);
}