import React, { Component } from 'react';
import IconFont from '@/components/IconFont';
import '../index.scss'

class SceneRight extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div className="serch-container">
       <div className="serch-right-header">高二级开灯</div>
       <div className="serch-right-container">
         {/* 设备控制 begin */}
         <div className="serch-right-device">
           <div className="device-header">设备控制</div>
           <div className="device-list">
             <div className="device-item yes">
               <div className="device-item-img"><IconFont type="icon-chuanglian-shouye" /></div>
               <div className="device-item-name ellipsis">窗帘-开</div>
             </div>
             <div className="device-item yes">
               <div className="device-item-img"><IconFont type="icon-diandeng-shouye" /></div>
               <div className="device-item-name ellipsis">电灯-开</div>
             </div>
             <div className="device-item no">
               <div className="device-item-img"><IconFont type="icon-fengshan-shouye" /></div>
               <div className="device-item-name ellipsis">风扇-关</div>
             </div>
             <div className="device-item no">
               <div className="device-item-img"><IconFont type="icon-xiaochengxutubiao-19" /></div>
               <div className="device-item-name ellipsis">显示器-关</div>
             </div>
             <div className="device-item yes">
               <div className="device-item-img"><IconFont type="icon-menjin-shouye" /></div>
               <div className="device-item-name ellipsis">门禁-开</div>
             </div>
             <div className="device-item yes">
               <div className="device-item-img"><IconFont type="icon-chuanglian-shouye" /></div>
               <div className="device-item-name ellipsis">窗帘-开</div>
             </div>
             <div className="device-item yes">
               <div className="device-item-img"><IconFont type="icon-diandeng-shouye" /></div>
               <div className="device-item-name ellipsis">电灯-开</div>
             </div>
             <div className="device-item no">
               <div className="device-item-img"><IconFont type="icon-fengshan-shouye" /></div>
               <div className="device-item-name ellipsis">风扇-关</div>
             </div>
             <div className="device-item no">
               <div className="device-item-img"><IconFont type="icon-xiaochengxutubiao-19" /></div>
               <div className="device-item-name ellipsis">显示器-关</div>
             </div>
             <div className="device-item yes">
               <div className="device-item-img"><IconFont type="icon-menjin-shouye" /></div>
               <div className="device-item-name ellipsis">门禁-开</div>
             </div>
             
           </div>
         </div>
         {/* 设备控制 end */}
         {/* 接收成员 begin */}
         <div className="device-user">
         <div className="user-header">
           <div className="user-header-title">接收成员</div>
           <div className="user-header-ico"><IconFont type="icon-jinru" /></div>
         </div>
         <div className="user-container">
           <div className="user-list">
             <div className="user-list-header">分区1</div>
             <div className="user-list-con">
               <div className="user-list-item">高二(2)班</div>
               <div className="user-list-item">高二(2)班</div>
               <div className="user-list-item">高二(2)班</div>
               <div className="user-list-item">高二(2)班</div>
             </div>
           </div>
           
           <div className="user-list">
             <div className="user-list-header">分区1</div>
             <div className="user-list-con">
               <div className="user-list-item">高二(2)班</div>
               <div className="user-list-item">高二(2)班</div>
               <div className="user-list-item">高二(2)班</div>
               <div className="user-list-item">高二(2)班</div>
             </div>
           </div>

           <div className="user-list">
             <div className="user-list-header">分区1</div>
             <div className="user-list-con">
               <div className="user-list-item">高二(2)班</div>
               <div className="user-list-item">高二(2)班</div>
               <div className="user-list-item">高二(2)班</div>
               <div className="user-list-item">高二(2)班</div>
             </div>
           </div>

           <div className="user-list">
             <div className="user-list-header">分区1</div>
             <div className="user-list-con">
               <div className="user-list-item">高二(2)班</div>
               <div className="user-list-item">高二(2)班</div>
               <div className="user-list-item">高二(2)班</div>
               <div className="user-list-item">高二(2)班</div>
             </div>
           </div>

         </div>

          <div className="user-footer">
            共45个
          </div>

         </div>
         {/* 接收成员 end */}

         {/* 生效时间 begin */}
         <div className="device-user">
         <div className="user-header">
           <div className="user-header-title">接收成员</div>
           <div className="user-header-ico"><IconFont type="icon-jinru" /></div>
         </div>
         <div className="user-container">
           <div className="effect-date">
           <div className="user-container-title">执行时间</div>
           <div className="user-container-list">
             <div className="user-date-item">08:30:00</div>
             <div className="user-date-item">08:30:00</div>
             <div className="user-date-item">08:30:00</div>
             <div className="user-date-item">08:30:00</div>
             <div className="user-date-item">08:30:00</div>
             <div className="user-date-item">08:30:00</div>
             <div className="user-date-item">08:30:00</div>
             <div className="user-date-item">08:30:00</div>
             <div className="user-date-item">08:30:00</div>
             <div className="user-date-item">08:30:00</div>
             <div className="user-date-item">08:30:00</div>
             <div className="user-date-item">08:30:00</div>
             <div className="user-date-item">08:30:00</div>
             <div className="user-date-item">08:30:00</div>
             <div className="user-date-item">08:30:00</div>
           </div>
           </div>
         </div>

          <div className="user-footer">
            共45个
          </div>

         </div>
         {/* 生效时间 end */}

         {/* 重复 begin */}
         <div className="device-user">
         <div className="user-header">
           <div className="user-header-title">重复</div>
           <div className="user-header-ico"><IconFont type="icon-jinru" /></div>
         </div>
         <div className="user-container">
           <div className="effect-date">
           <div className="user-container-title">执行时间</div>
           <div className="user-container-list">
             <div className="user-date-item">08:30:00</div>
             <div className="user-date-item">08:30:00</div>
             <div className="user-date-item">08:30:00</div>
             <div className="user-date-item">08:30:00</div>
             <div className="user-date-item">08:30:00</div>
             <div className="user-date-item">08:30:00</div>
             <div className="user-date-item">08:30:00</div>
             <div className="user-date-item">08:30:00</div>
             <div className="user-date-item">08:30:00</div>
             <div className="user-date-item">08:30:00</div>
             <div className="user-date-item">08:30:00</div>
             <div className="user-date-item">08:30:00</div>
             <div className="user-date-item">08:30:00</div>
             <div className="user-date-item">08:30:00</div>
             <div className="user-date-item">08:30:00</div>
           </div>
           </div>
         </div>

          <div className="user-footer">
            共45个
          </div>

         </div>
         {/* 重复 end */}
       </div>
      </div>
    );
  }
}

export default SceneRight;
