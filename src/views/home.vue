<template>
  <div class="home">
    <h1 class="title">
      解放军总医院医师心血管病危险因素调查表
    </h1>
    <h2 class="sub-title">
      知情同意书
    </h2>
    <div class="desc">
      尊敬的医师：
      <br>
      心血管疾病(CVD)是中国死亡和过早死亡的主要原因，占中国人口死亡的原因的40%。医师是心血管病防治的主要力量。要从根本上有效地控制心血管疾病的危害，早期发现、早期干预心血管病危险因素是重要的途径和措施；健康的生活方式是预防和延缓心血管病的最基本的方法。医师们作为心血管病防治的中坚力量，在紧张繁忙的工作中往往忽视了自身的心血管病健康。
      <br>
      为了了解医师目前心血管病危险因素的现状，以便提出有针对性的防治建议和措施，中国人民解放军总医院发起了 “解放军总医院医师心血管病危险因素队列研究”，了解您目前心血管病危险因素和相关知识、行为等信息；并会进行长期随访。
      <br>
      完成本次调查问卷后，您可通过绿色通道预约相关检查，包括心脏超声、颈动脉超声、踝臂指数（ABI）、随机血糖等（共约50分钟）。参加本次调查有助于您了解目前的健康状况，同时达到对自身健康的关注和重视。我们将守护每一名医师的自身心血管健康，从而为我国心血管病研究做出贡献！
      <br>
      本调查是自愿参加。所调查的关于您个人的信息将严格保密，我们承诺不泄露、不公开。
      <br>
      我们非常感谢您对本项工作的理解和支持。
    </div>
    <div class="form">
      <div class="form-item form-item--required" :class="{'is-error': errFields.userName}" data-name="userName">
        <div class="form-item__label">
          您的姓名
        </div>
        <div class="form-item__content">
          <van-field
            v-model="params.userName"
            placeholder="请输入姓名"
            clearable
          >
            <template slot="left-icon">
              <ComSvgIcon name="user" />
            </template>
          </van-field>
        </div>
        <div class="form-item__error">
          <template v-if="errFields.userName && errFields.userName.length">
            <div
              v-for="(item, index) in errFields.userName.slice(0, 1)"
              :key="index"
            >
              {{ item.message }}
            </div>
          </template>
        </div>
      </div>

      <div class="form-item form-item--required" data-name="gender">
        <div class="form-item__label">
          您的性别
        </div>
        <div class="form-item__content">
          <van-radio-group v-model="params.gender" direction="horizontal">
            <van-radio name="1">
              男
            </van-radio>
            <van-radio name="2">
              女
            </van-radio>
          </van-radio-group>
        </div>
      </div>

      <div class="form-item form-item--required" data-name="phone">
        <div class="form-item__label">
          您的手机号
        </div>
        <div class="form-item__content">
          <van-field
            v-model="params.phone"
            placeholder="请输入手机号"
            clearable
          >
            <template slot="left-icon">
              <ComSvgIcon name="phone" />
            </template>
          </van-field>
        </div>
      </div>

      <div class="form-item">
        <div class="form-item__label">
          邮箱
        </div>
        <div class="form-item__content">
          <van-field
            v-model="params.email"
            placeholder="请输入邮箱"
            clearable
          >
            <template slot="left-icon">
              <ComSvgIcon name="email" />
            </template>
          </van-field>
        </div>
      </div>

      <div class="form-item">
        <div class="form-item__label">
          紧急联系人手机号
        </div>
        <div class="form-item__content">
          <van-field
            v-model="params.emergencyPhone"
            placeholder="请输入手机号"
            clearable
          >
            <template slot="left-icon">
              <ComSvgIcon name="phone" />
            </template>
          </van-field>
        </div>
      </div>

      <div class="form-item">
        <div class="form-item__label">
          工作科室
        </div>
        <div class="form-item__content">
          <van-field
            v-model="params.department"
            placeholder="请输入工作科室"
            clearable
          />
        </div>
      </div>

      <div class="form-item">
        <div class="form-item__label">
          技术职称
        </div>
        <div class="form-item__content">
          <van-radio-group v-model="params.technicalTitleType" class="radio--vertical">
            <van-radio name="1">
              正高
            </van-radio>
            <van-radio name="2">
              副高
            </van-radio>
            <van-radio name="3">
              中级
            </van-radio>
            <van-radio name="4">
              初级
            </van-radio>
            <van-radio name="5">
              其它
            </van-radio>
          </van-radio-group>
          <van-field
            v-if="params.technicalTitleType === '5'"
            v-model="params.technicalTitleText"
            clearable
          />
        </div>
      </div>

      <div class="form-item">
        <div class="form-item__label">
          您的出生日期（阳历）
        </div>
        <div class="form-item__content">
          <DateField
            v-model="params.birthday"
            type="date"
          />
        </div>
      </div>

      <div class="form-item">
        <div class="form-item__label">
          民族
        </div>
        <div class="form-item__content">
          <van-radio-group v-model="params.nationalType" class="radio--vertical">
            <van-radio name="1">
              汉族
            </van-radio>
            <van-radio name="2">
              回族
            </van-radio>
            <van-radio name="3">
              满族
            </van-radio>
            <van-radio name="4">
              藏族
            </van-radio>
            <van-radio name="5">
              苗族
            </van-radio>
            <van-radio name="6">
              其它
            </van-radio>
          </van-radio-group>
          <van-field
            v-if="params.nationalType === '6'"
            v-model="params.nationalText"
            clearable
          />
        </div>
      </div>

      <div class="form-item">
        <div class="form-item__label">
          文化程度
        </div>
        <div class="form-item__content">
          <van-radio-group v-model="params.educationBackground" class="radio--vertical">
            <van-radio name="1">
              高中及以下
            </van-radio>
            <van-radio name="2">
              大学
            </van-radio>
            <van-radio name="3">
              硕士
            </van-radio>
            <van-radio name="4">
              博士
            </van-radio>
          </van-radio-group>
        </div>
      </div>

      <div class="form-item">
        <div class="form-item__label">
          婚姻状态
        </div>
        <div class="form-item__content">
          <van-radio-group v-model="params.marriage" class="radio--vertical">
            <van-radio name="1">
              未婚
            </van-radio>
            <van-radio name="2">
              已婚
            </van-radio>
            <van-radio name="3">
              离婚
            </van-radio>
            <van-radio name="4">
              丧偶
            </van-radio>
          </van-radio-group>
        </div>
      </div>

      <div class="form-item">
        <div class="form-item__label">
          多长时间体检一次
        </div>
        <div class="form-item__content">
          <van-radio-group v-model="params.healthExaminationDate" class="radio--vertical">
            <van-radio name="1">
              小于1年
            </van-radio>
            <van-radio name="2">
              1-3年
            </van-radio>
            <van-radio name="3">
              大于3年
            </van-radio>
            <van-radio name="4">
              不详
            </van-radio>
          </van-radio-group>
        </div>
      </div>

      <div class="form-item">
        <div class="form-item__label">
          家庭总月收入
        </div>
        <div class="form-item__content">
          <van-radio-group v-model="params.familyMonthIncome" class="radio--vertical">
            <van-radio name="1">
              1万元以下
            </van-radio>
            <van-radio name="2">
              10001元-20001元
            </van-radio>
            <van-radio name="3">
              20001元-30001元
            </van-radio>
            <van-radio name="4">
              3万元以上
            </van-radio>
          </van-radio-group>
        </div>
      </div>

      <div class="form-item__label">
        生活方式
      </div>

      <div class="form-item">
        <div class="form-item__label">
          是否抽烟
        </div>
        <div class="form-item__content">
          <van-radio-group v-model="params.isSmoke">
            <van-cell-group class="cell--radio">
              <van-cell clickable @click="params.isSmoke = '1'">
                <template #icon>
                  <van-radio name="1" />
                </template>
                <template #title>
                  <span>从不抽烟</span>
                </template>
                <template #label>
                  <span />
                </template>
              </van-cell>
              <van-cell clickable @click="params.isSmoke = '2'">
                <template #icon>
                  <van-radio name="2" />
                </template>
                <template #title>
                  <span>抽烟</span>
                </template>
                <template #label>
                  <span>一生连续或累计吸烟超过6个或或以上</span>
                </template>
              </van-cell>
              <van-cell clickable @click="params.isSmoke = '3'">
                <template #icon>
                  <van-radio name="3" />
                </template>
                <template #title>
                  <span>戒烟</span>
                </template>
                <template #label>
                  <span>调查前吸烟连续至少六个月， 但现在已不再吸烟</span>
                </template>
              </van-cell>
            </van-cell-group>
          </van-radio-group>
        </div>
      </div>

      <div class="form-item">
        <div class="form-item__label">
          一年来饮白酒的频率
        </div>
        <div class="form-item__content">
          <van-radio-group v-model="params.liquor" class="radio--vertical">
            <van-radio name="1">
              ≥7次/周
            </van-radio>
            <van-radio name="2">
              ≥3次/周
            </van-radio>
            <van-radio name="3">
              1-2次/周
            </van-radio>
            <van-radio name="4">
              &lt;1次/周
            </van-radio>
            <van-radio name="5">
              不饮
            </van-radio>
          </van-radio-group>
        </div>
      </div>

      <div class="form-item">
        <div class="form-item__label">
          一年来饮啤酒的频率
        </div>
        <div class="form-item__content">
          <van-radio-group v-model="params.beer" class="radio--vertical">
            <van-radio name="1">
              ≥7次/周
            </van-radio>
            <van-radio name="2">
              ≥3次/周
            </van-radio>
            <van-radio name="3">
              1-2次/周
            </van-radio>
            <van-radio name="4">
              &lt;1次/周
            </van-radio>
            <van-radio name="5">
              不饮
            </van-radio>
          </van-radio-group>
        </div>
      </div>

      <div class="form-item">
        <div class="form-item__label">
          一年来饮葡萄酒的频率
        </div>
        <div class="form-item__content">
          <van-radio-group v-model="params.redWine" class="radio--vertical">
            <van-radio name="1">
              ≥7次/周
            </van-radio>
            <van-radio name="2">
              ≥3次/周
            </van-radio>
            <van-radio name="3">
              1-2次/周
            </van-radio>
            <van-radio name="4">
              &lt;1次/周
            </van-radio>
            <van-radio name="5">
              不饮
            </van-radio>
          </van-radio-group>
        </div>
      </div>

      <div class="form-item">
        <div class="form-item__label">
          通常晚上几点睡觉
        </div>
        <div class="form-item__content">
          <van-radio-group v-model="params.sleepTime" class="radio--vertical">
            <van-radio name="1">
              9-10
            </van-radio>
            <van-radio name="2">
              10-11
            </van-radio>
            <van-radio name="3">
              11-12
            </van-radio>
            <van-radio name="4">
              12-1
            </van-radio>
            <van-radio name="5">
              1-2
            </van-radio>
            <van-radio name="6">
              2-3
            </van-radio>
            <van-radio name="7">
              3-4
            </van-radio>
          </van-radio-group>
        </div>
      </div>

      <div class="form-item">
        <div class="form-item__label">
          平均睡眠时间
        </div>
        <div class="form-item__content">
          <van-radio-group v-model="params.sleepRange" class="radio--vertical">
            <van-radio name="1">
              ≥8h
            </van-radio>
            <van-radio name="2">
              7-7.9h
            </van-radio>
            <van-radio name="3">
              6-6.9h
            </van-radio>
            <van-radio name="4">
              5-5.9h
            </van-radio>
            <van-radio name="5">
              1-2
            </van-radio>
            <van-radio name="6">
              2-3
            </van-radio>
            <van-radio name="7">
              &lt;5h
            </van-radio>
          </van-radio-group>
        </div>
      </div>

      <div class="form-item">
        <div class="form-item__label">
          是否上夜班
        </div>
        <div class="form-item__content">
          <van-radio-group v-model="params.isNightShift" class="radio--vertical">
            <van-radio name="1">
              是
            </van-radio>
            <van-radio name="2">
              否
            </van-radio>
          </van-radio-group>
        </div>
      </div>

      <div class="form-item">
        <div class="form-item__label">
          饮食口味
        </div>
        <div class="form-item__content">
          <van-checkbox-group v-model="params.eatTaste" class="checkbox--vertical">
            <van-checkbox name="1" shape="square">
              偏淡
            </van-checkbox>
            <van-checkbox name="2" shape="square">
              正常
            </van-checkbox>
            <van-checkbox name="3" shape="square">
              偏咸
            </van-checkbox>
            <van-checkbox name="4" shape="square">
              偏甜
            </van-checkbox>
            <van-checkbox name="5" shape="square">
              偏辣
            </van-checkbox>
            <van-checkbox name="6" shape="square">
              偏酸
            </van-checkbox>
          </van-checkbox-group>
        </div>
      </div>
    </div>
    <van-button type="primary" block @click="onSumbit">
      提 交
    </van-button>
    <ComBacktop :bottom="50" />
  </div>
</template>

<script>
import Schema from 'async-validator'
import { minBy } from 'lodash'
import DateField from '@/components/date-field'
import { validator as validateUtil } from '@/utils/validate'
import { elementInView, scrollTo } from '@/utils/dom'

const rules = {
  userName: [
    { required: true, message: '请输入姓名' }
  ],
  gender: [
    { required: true, message: '请选择性别' }
  ],
  phone: [
    { required: true, message: '请输入手机号' },
    {
      validator: (rule, value, callback) => {
        if (validateUtil(value, 'mobile')) {
          callback()
        } else {
          callback(new Error('请输入正确的手机号'))
        }
      }
    }
  ],
  email: [
    { type: 'email', message: '请输入正确的邮箱' }
  ]
}
export default {
  name: 'Home',
  components: {
    DateField
  },
  data () {
    return {
      params: {
        userName: '',
        gender: '',
        phone: '',
        email: '',
        emergencyPhone: '',
        department: '',
        technicalTitleType: '',
        technicalTitleText: '',
        birthday: null,
        nationalType: '',
        nationalText: '',
        educationBackground: '',
        marriage: '',
        healthExaminationDate: '',
        familyMonthIncome: '',
        isSmoke: '',
        liquor: '',
        beer: '',
        redWine: '',
        sleepTime: '',
        sleepRange: '',
        isNightShift: '',
        eatTaste: []
      },
      errFields: {}
    }
  },
  methods: {
    // 根据验证结果 滚动到验证错误的节点
    scrollToErrorNode (fieldObj) {
      const errorNodes = []
      Object.keys(fieldObj).forEach(field => {
        const el = document.querySelector(`[data-name=${field}]`)
        if (el) {
          const isView = elementInView(el)
          if (!isView) {
            errorNodes.push({
              name: field,
              el,
              y: el.getBoundingClientRect().y
            })
          }
        }
      })
      const minYNode = minBy(errorNodes, node => node.y)
      if (minYNode) {
        scrollTo(window, window.pageYOffset, minYNode.el.offsetTop, 800)
        const errList = fieldObj[minYNode.name]
        if (errList && errList.length) {
          const errObj = errList[0]
          const errMessage = errObj.message
          console.log('errMessage', errMessage)
        }
      }
    },
    onSumbit () {
      const validator = new Schema(rules)
      validator.validate(this.params, (err, fields) => {
        if (err) {
          // fail
          this.scrollToErrorNode(fields)
          this.errFields = fields
        } else {
          // success
          console.log('success', this.params)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .title, .sub-title {
    text-align: center;
  }
  .title {
    padding: 20px 10px;
    font-size: 20px;
    color: @primary-color;
  }
  .sub-title {
    font-size: 18px;
  }
  .desc {
    padding: 10px;
    line-height: 24px;
    border-bottom: 1px dashed #ccc;
  }
  .form {
    padding: 0 20px;
    .form-item {
      padding-bottom: 20px;
    }
    .form-item--required {
      .form-item__label {
        position: relative;
        padding-left: 12px;
      }
      .form-item__label:before {
        content: "*";
        position: absolute;
        top: 18px;
        left: 0;
        color: #f00;
        font-size: 18px;
      }
    }
    .form-item__label {
      padding: 15px 0;
      font-size: 16px;
      font-weight: 700;
    }
    ::v-deep .van-field {
      padding-top: 0;
      padding-bottom: 0;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
    }
    ::v-deep .van-field__left-icon {
      display: flex;
      align-items: center;
      color: @color-text-secondary;
      font-size: 18px;
    }
    ::v-deep .van-field__control {
      padding-top: 6px;
      padding-bottom: 6px;
    }
    ::v-deep .van-radio--horizontal {
      margin-right: 20px;
    }
  }
  .radio--vertical {
    ::v-deep .van-radio {
      margin-bottom: 12px;
    }
  }
  .checkbox--vertical {
    ::v-deep .van-checkbox {
      margin-bottom: 12px;
      .van-checkbox__icon .van-icon {
        border-radius: 2px;
      }
    }
  }
  .cell--radio ::v-deep .van-cell {
    padding-left: 0;
    padding-right: 0;
    .van-radio {
      margin-right: 8px;
    }
  }
</style>
