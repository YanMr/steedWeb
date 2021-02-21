import React, { Component } from 'react';
import '../index.scss'

class SceneDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div>
        {/* 指定日期 begin */}
        <div className="serch-details-Model">
          <div className="model-title">
            <div className="model-title-text">重复</div>
            <div className="model-title-num">已选择20个</div>
          </div>

          <div className="model-container">
              <div className="model-list">
                <div className="model-list-name cur">指定日期</div>
                <div className="model-list-name">20.12.30</div>
                <div className="model-list-name">20.12.30</div>
                <div className="model-list-name">20.12.30</div>
              </div>
              <div className="model-list">
                <div className="model-list-name cur">指定日期</div>
                <div className="model-list-name">20.12.30</div>
                <div className="model-list-name">20.12.30</div>
                <div className="model-list-name">20.12.30</div>
              </div>
              <div className="model-list">
                <div className="model-list-name cur">指定日期</div>
                <div className="model-list-name">20.12.30</div>
                <div className="model-list-name">20.12.30</div>
                <div className="model-list-name">20.12.30</div>
              </div>
          </div>

          <div className="model-footer">
            <div className="submit cur" onClick={this.props.close} >确定</div>
            <div className="submit" onClick={this.props.close}>取消</div>
          </div>

        </div>
        {/* 指定日期 end */}
        {/* 重复星期 begin */}
        {/* <div className="serch-details-Model">model1</div> */}
        {/* 重复星期 end */}
      </div>
    );
  }
}

export default SceneDetails;
