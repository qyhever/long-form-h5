<template>
  <div class="v-home">
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
      <van-form
        ref="form"
        validate-first
        @failed="onFailed"
        @submit="onSubmit"
      >
        <div class="form-item__label form-item--required__label">
          您的姓名
        </div>
        <van-field
          v-model="params.userName"
          name="userName"
          placeholder="请输入姓名"
          clearable
          :rules="[{ required: true, message: '请输入姓名' }]"
        >
          <template #left-icon>
            <ComSvgIcon name="user" />
          </template>
        </van-field>

        <div class="form-item__label form-item--required__label">
          您的性别
        </div>
        <van-field
          class="van-field--noborder"
          name="gender"
          :rules="[{ required: true, message: '请选择性别' }]"
        >
          <template #input>
            <van-radio-group v-model="params.gender" direction="horizontal">
              <van-radio name="1">
                男
              </van-radio>
              <van-radio name="2">
                女
              </van-radio>
            </van-radio-group>
          </template>
        </van-field>

        <div class="form-item__label form-item--required__label">
          您的手机号
        </div>
        <van-field
          v-model="params.phone"
          name="phone"
          placeholder="请输入手机号"
          clearable
          :rules="[
            { required: true, message: '请输入手机号' },
            { validator: phoneValidator, message: '请输入正确的手机号' }
          ]"
        >
          <template #left-icon>
            <ComSvgIcon name="phone" />
          </template>
        </van-field>

        <div class="form-item__label">
          邮箱
        </div>
        <van-field
          v-model="params.email"
          name="email"
          placeholder="请输入邮箱"
          clearable
          :rules="[
            { validator: emailValidator, message: '请输入正确的邮箱' }
          ]"
        >
          <template #left-icon>
            <ComSvgIcon name="email" />
          </template>
        </van-field>

        <div class="form-item__label">
          紧急联系人手机号
        </div>
        <van-field
          v-model="params.emergencyPhone"
          name="emergencyPhone"
          placeholder="请输入手机号"
          clearable
          :rules="[
            { validator: phoneValidator, message: '请输入正确的手机号' }
          ]"
        >
          <template #left-icon>
            <ComSvgIcon name="phone" />
          </template>
        </van-field>

        <div class="form-item__label">
          工作科室
        </div>
        <van-field
          v-model="params.department"
          name="department"
          placeholder="请输入工作科室"
          clearable
        />

        <div class="form-item__label">
          技术职称
        </div>
        <van-field
          class="van-field--noborder"
          name="technicalTitleType"
        >
          <template #input>
            <van-radio-group v-model="params.technicalTitleType" class="radio--vertical">
              <van-radio
                v-for="(item, index) in technicalTitleTypeOptionList"
                :key="index"
                :name="item.value"
              >
                {{ item.label }}
              </van-radio>
            </van-radio-group>
          </template>
        </van-field>

        <van-field
          v-if="params.technicalTitleType === '5'"
          v-model="params.technicalTitleText"
          name="technicalTitleText"
          clearable
        />

        <div class="form-item__label">
          您的出生日期（阳历）
        </div>
        <van-field
          class="van-field--noborder"
          name="birthday"
        >
          <template #input>
            <DateField
              v-model="params.birthday"
              type="date"
              :min-date="birthdayMinDate"
              :max-date="birthdayMaxDate"
            />
          </template>
        </van-field>

        <div class="form-item__label">
          民族
        </div>
        <van-field
          class="van-field--noborder"
          name="nationalType"
        >
          <template #input>
            <van-radio-group v-model="params.nationalType" class="radio--vertical">
              <van-radio
                v-for="(item, index) in nationalTypeOptionList"
                :key="index"
                :name="item.value"
              >
                {{ item.label }}
              </van-radio>
            </van-radio-group>
          </template>
        </van-field>

        <van-field
          v-if="params.nationalType === '6'"
          v-model="params.nationalText"
          name="nationalText"
          clearable
        />

        <div class="form-item__label">
          文化程度
        </div>
        <van-field
          class="van-field--noborder"
          name="educationBackground"
        >
          <template #input>
            <van-radio-group v-model="params.educationBackground" class="radio--vertical">
              <van-radio
                v-for="(item, index) in educationBackgroundOptionList"
                :key="index"
                :name="item.value"
              >
                {{ item.label }}
              </van-radio>
            </van-radio-group>
          </template>
        </van-field>

        <div class="form-item__label">
          婚姻状态
        </div>
        <van-field
          class="van-field--noborder"
          name="marriage"
        >
          <template #input>
            <van-radio-group v-model="params.marriage" class="radio--vertical">
              <van-radio
                v-for="(item, index) in marriageOptionList"
                :key="index"
                :name="item.value"
              >
                {{ item.label }}
              </van-radio>
            </van-radio-group>
          </template>
        </van-field>

        <div class="form-item__label">
          多长时间体检一次
        </div>
        <van-field
          class="van-field--noborder"
          name="healthExaminationDate"
        >
          <template #input>
            <van-radio-group v-model="params.healthExaminationDate" class="radio--vertical">
              <van-radio
                v-for="(item, index) in healthExaminationDateOptionList"
                :key="index"
                :name="item.value"
              >
                {{ item.label }}
              </van-radio>
            </van-radio-group>
          </template>
        </van-field>

        <div class="form-item__label">
          家庭总月收入
        </div>
        <van-field
          class="van-field--noborder"
          name="familyMonthIncome"
        >
          <template #input>
            <van-radio-group v-model="params.familyMonthIncome" class="radio--vertical">
              <van-radio
                v-for="(item, index) in familyMonthIncomeOptionList"
                :key="index"
                :name="item.value"
              >
                {{ item.label }}
              </van-radio>
            </van-radio-group>
          </template>
        </van-field>

        <div class="form-item__label">
          是否抽烟
        </div>
        <van-field
          class="van-field--noborder"
          name="isSmoke"
        >
          <template #input>
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
          </template>
        </van-field>

        <div class="form-item__label">
          饮食口味
        </div>
        <van-field
          class="van-field--noborder"
          name="eatTaste"
        >
          <template #input>
            <van-checkbox-group v-model="params.eatTaste" class="checkbox--vertical">
              <van-checkbox
                v-for="(item, index) in eatTasteOptionList"
                :key="index"
                :name="item.value"
              >
                {{ item.label }}
              </van-checkbox>
            </van-checkbox-group>
          </template>
        </van-field>
      </van-form>
    </div>
    <van-button type="primary" block @click="triggerSumbit">
      提 交
    </van-button>
    <ComBacktop :bottom="50" />
  </div>
</template>

<script>
import { validator as validateUtil } from '@/utils/validate'
import DateField from '@/components/date-field'
const technicalTitleTypeOptionList = [
  { label: '正高', value: '1' },
  { label: '副高', value: '2' },
  { label: '中级', value: '3' },
  { label: '初级', value: '4' },
  { label: '其它', value: '5' }
]
const nationalTypeOptionList = [
  { label: '汉族', value: '1' },
  { label: '回族', value: '2' },
  { label: '满族', value: '3' },
  { label: '藏族', value: '4' },
  { label: '苗族', value: '5' },
  { label: '其它', value: '6' }
]
const educationBackgroundOptionList = [
  { label: '高中及以下', value: '1' },
  { label: '大学', value: '2' },
  { label: '硕士', value: '3' },
  { label: '博士', value: '4' }
]
const marriageOptionList = [
  { label: '未婚', value: '1' },
  { label: '已婚', value: '2' },
  { label: '离婚', value: '3' },
  { label: '丧偶', value: '4' }
]
const healthExaminationDateOptionList = [
  { label: '小于1年', value: '1' },
  { label: '1-3年', value: '2' },
  { label: '大于3年', value: '3' },
  { label: '不详', value: '4' }
]
const familyMonthIncomeOptionList = [
  { label: '1万元以下', value: '1' },
  { label: '10001元-20001元', value: '2' },
  { label: '20001元-30001元', value: '3' },
  { label: '3万元以上', value: '4' }
]
const eatTasteOptionList = [
  { label: '偏淡', value: '1' },
  { label: '正常', value: '2' },
  { label: '偏咸', value: '3' },
  { label: '偏甜', value: '4' },
  { label: '偏辣', value: '5' },
  { label: '偏酸', value: '6' }
]
export default {
  name: 'VForm',
  components: {
    DateField
  },
  data () {
    return {
      technicalTitleTypeOptionList,
      nationalTypeOptionList,
      educationBackgroundOptionList,
      marriageOptionList,
      healthExaminationDateOptionList,
      familyMonthIncomeOptionList,
      eatTasteOptionList,
      birthdayMinDate: new Date(1901, 0, 1),
      birthdayMaxDate: new Date(),
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
        eatTaste: []
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('params', this.params)
    },
    triggerSumbit () {
      this.$refs.form.submit()
    },
    onFailed (errorInfo) {
      console.log('failed', errorInfo)
      this.$refs.form.scrollToField(errorInfo.errors[0].name, {
        behavior: 'smooth'
      })
    },
    // 校验函数返回 true 表示校验通过，false 表示不通过
    phoneValidator (val) {
      if (!val) {
        return true
      }
      return validateUtil(val, 'mobile')
    },
    emailValidator (val) {
      if (!val) {
        return true
      }
      return validateUtil(val, 'email')
    }
  }
}
</script>

<style lang="less" scoped>
.v-home {}
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
  ::v-deep .van-field {
    padding-top: 0;
    padding-bottom: 0;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    overflow: visible;
    margin-bottom: 20px;
    &.van-field--noborder {
      border: 0;
      padding-left: 0;
    }
    &:after {
      display: none;
    }
  }
  ::v-deep .van-field__left-icon {
    display: flex;
    align-items: center;
    color: #999;
    font-size: 18px;
  }
  ::v-deep .van-field__control {
    padding-top: 6px;
    padding-bottom: 6px;
  }
  ::v-deep .van-field__error-message {
    position: absolute;
    left: 0;
    padding-top: 4px;
  }
  ::v-deep .van-cell__value {
    position: static;
  }
  ::v-deep .van-field--error .van-field__control {
    color: #323233;
  }
  ::v-deep .van-field--error .van-field__control::placeholder {
    color: #c8c9cc;
  }
}
.form-item__label {
  position: relative;
  padding: 15px 0;
  font-size: 16px;
  font-weight: 700;
}
.form-item--required__label {
  padding-left: 12px;
  &:before {
    content: "*";
    position: absolute;
    top: 18px;
    left: 0;
    color: #f00;
    font-size: 18px;
  }
}
.radio--vertical ::v-deep .van-radio {
  margin-bottom: 12px;
  &:last-of-type {
    margin-bottom: 0;
  }
}
.checkbox--vertical {
  ::v-deep .van-checkbox {
    margin-bottom: 12px;
    &:last-of-type {
      margin-bottom: 0;
    }
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
