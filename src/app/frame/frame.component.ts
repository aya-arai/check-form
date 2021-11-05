import { Component, Inject, OnInit, ViewChild, NgModule} from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSliderModule } from '@angular/material/slider';
import { FormControl, Validators} from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { MatAccordion } from '@angular/material/expansion';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NONE_TYPE } from '@angular/compiler';
import { BehaviorSubject, Observable } from 'rxjs';

// jsonファイル
import logical from '../../../logical.json';
import formatFile from '../../../format.json';


// table
export interface PeriodicElement {
  id: string;
  textname: string;
}

// 数値項目1
export interface Numerical {
  value: any;
  viewValue: any;
}
// 数値項目2
export interface Numerical2{
  value2: any;
  viewValue2: any;
}
// 演算子
interface Operater {
  value: string;
  valueName: string;
}
interface OptionAnswer {
  value: string;
  ViewValue: string;
}
export interface UserData {
  id: string;
  textname: string;
}
interface Option{
  value: string;
  viewValue: string;
}
interface OperationMainName{
  value: string;
  viewValue: string;
}
interface Group1OptionSharp{
  value: string;
  ViewValue: string;
}
interface OperaterName{
  value: string;
  viewValue: string;
}

interface OpeCondition{
  value: string;
  viewValue: string;
}
interface OpeCondition2{
  value: string;
  viewValue: string;
}
interface OpeConditionGroup2Part1{
  value: string;
  viewValue: string;
}
interface OpeConditionGroup2Part2{
  value: string;
  viewValue: string;
}
interface NumericalItem{
  value: string;
  ViewValue: string;
}
interface EqualSignNumGroup2Select{
  value: string;
  viewValue: string;
}
interface EqualSignChoiceGroup2Select{
  value: string;
  viewValue: string;
}
interface NumericalItemGropu2Vol1{
  value: string;
  ViewValue: string;
}
interface NumericalItemGropu2Vol2{
  value: string;
  ViewValue: string;
}
interface AlertNumSelect{
  value: string;
  ViewValue: string;
}

export interface DialogData {
  selectOptionNameJd: string;
}

/**
 * @Component
 */
declare let $: any;
@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.css'],
})

@Injectable()
export class FrameComponent implements OnInit {

  // 入力フォームチェック
  checkboxid;
  boxfolderid;
  excelfileid;
  checkboxlistid;
  checklistname: string;
  boxfoldername: string;
  excelfilename: string;
  checkboxlist;
  public radiocheck: number;

  // アラート部分
  DisplaySetting = 'none';
  DisplaySetting2 = 'none';
  alertNumeValue: number;

  // selectValue
  selectedOption: string;
  selectOptionNameMain: string;
  selectDisplay2OptionName: string;
  selectGroup1OptionSharp2: string;
  selectOptionConditionAdd: string;
  Sharp2Inputint: string;
  Sharp2Inputdecimal: string;
  AlertConditionSelect: string;
  selectConditionAlert2: string;
  select2ConditionAlert2: string;
  AlertOptionSelectValue2: string;
  Alert2OptionSelectValue2: string;
  AlertNumInput2: any;
  selectOptionName: string; // 項目グループ2
  selectOptionNameSecond: string;
  selectOptionNameSecond2: string;
  selectOptionNameSecond3: string;
  AlertequalSign: string;
  equalSignAdd1: string;
  equalSignAdd2: string;
  equalSign2Add1: string;
  equalSign2Add2: string;
  equalSign2: string;
  equalSignAlert2: string;
  equalSign2Alert2: string;
  equalSignDisp1Alert2: string;
  equalGroup2NumPart1: string;
  equalGroup2ChoicePart1: string;
  equalGroup2ChoicePart2: string;
  numericalItem: string;
  equalSignGropu2No2: string;
  equal2SignGropu2No2: string;
  equalSignGropu2No3: string;
  equalSignGropu3Set2: string;
  equalSignGropu3No1: string; // 使ってない
  equalSignGropu3No2: string;
  equalSignGropu4No1: string;
  equalSignGropu4No2: string;
  Group2Part2Num: string;
  Group2Part2Calc2: string;
  Group2Part2Num2: string;
  Group3Part1Num: string; // 使ってない
  Group4Part2Num: string;
  Group2Part2Choce: string;
  Group2Part2Choce2: string;
  Group3Part1Choce: string; // 使ってない
  Group4Part2Choce: string;
  Group4Part2Choce2: string;
  Group2Part2ChoiceText: string;
  Group3Part1ChoiceText: string; // 使ってない
  Group4Part2ChoiceText: string;
  Group4Part2ChoiceText2: string;
  alertNumerical: string;
  alertNumerical2: string;
  alertSelectValue: string;
  numeselectVal: string;

  NoSetTitle: string;

  // input value
  numberGroupValue: number;
  calcGroup2Value: number;
  numberGroupValue2: number; //group2
  numberGroup2Value2: any; //group2
  Group2textChoicePart1: string;
  Group2ChoiceValueText: string; //group2
  numberGroupValueChoice2: string; //group2
  numberGrou3ValueChoice1: string; //group3
  numberGroup4ValueChoice1: string;
  numberGroup4ValueChoice2: string;


  // 項目グループ
  groupframe;
  groupframe2;
  groupframe3;
  groupframe4;
  matcardaddid;
  clickcount: number = 0;
  groupspandisp;

  // ボタンカウント
  countup: number = 0;

  // JSONデータ取得
  calc_operater;
  sample_ui;

  //数値のプルダウン1
  numevalue: Numerical[] = [
    {
      value: 'val-1',
      viewValue: '数値項目1'
    },
    {
      value: 'val-2',
      viewValue: '数値項目2'
    },
    { value: 'val-3',
      viewValue: '数値項目3'
    }
  ];
  // 数値のプルダウン2
  numevalue2: Numerical2[] = [
    {value2: 'val-1', viewValue2: '数値項目1'},
    {value2: 'val-2', viewValue2: '数値項目2'},
    {value2: 'val-3', viewValue2: '数値項目3'}
  ];
  // 演算子プルダウン
  oparation: Operater[] = [
    {value: 'add', valueName: '+'},
    {value: 'subtra', valueName: '-'},
    {value: 'multi', valueName: '×'},
    {value: 'divide', valueName: '÷'}
  ];
  // And Not メイン設定
  operationnamemain: OperationMainName[] = [
    {value: 'and', viewValue: 'AND' },
    {value: 'or', viewValue: 'OR'}
  ];
  // 項目グループ #の項目
  selectgroup1sharp: Group1OptionSharp[] = [
    {value: 'int', ViewValue: '整数' },
    {value: 'decimal', ViewValue: '小数'}
  ];
  // And Not(項目グループ2 表示条件)
  operationname: OperaterName[] = [
    {value: 'AND', viewValue: 'AND' },
    {value: 'OR', viewValue: 'OR'}
  ];
  //数値項目表示(項目グループ2 上段)
  numericalitem: NumericalItem[] = [
    {value: 'group2-num-select1', ViewValue: '数値'},
    {value: 'group2-calc-select1', ViewValue: '計算式'},
    {value: 'gropu2-choice-select1', ViewValue: '選択肢'},
  ];
  // 数値項目表示(項目グループ2 下段)
  numericalitemgropu2vol2: NumericalItemGropu2Vol2[] = [
    {value: 'group2-num-select-lower2', ViewValue: '数値'},
    {value: 'group2-calc-select-lower2', ViewValue: '計算式'},
    {value: 'gropu2-choice-select-lower2', ViewValue: '選択肢'},
  ];
  // 数値項目表示(項目グループ2 上段 数値)
   equalsignnumgroup2select: EqualSignNumGroup2Select[] = [
    {value: 'grater', viewValue: '<' },
    {value: 'less' , viewValue: '>'},
    {value: 'equal' , viewValue: '='},
    {value: 'graterequal' , viewValue: '<='},
    {value: 'lessequal', viewValue: '>='},
    {value: 'notequal', viewValue: '≠'}
  ];
  // 選択肢項目表示(項目グループ2 上段 選択肢)
  equalsignchoicegroup2select: EqualSignChoiceGroup2Select[] = [
    {value: '=' , viewValue: '='},
    {value: '≠', viewValue: '≠'}
  ];
  // 数値項目表示(項目グループ2の1)
  numericalitemgropu2vol1: NumericalItemGropu2Vol1[] = [
    {value: 'group2-item-1', ViewValue: '数値'},
    {value: 'gropu2-item-2', ViewValue: '選択肢'},
  ];
  // 数値選択時の不等号(項目グループ2の2)
  opeconditiongroup2part1: OpeConditionGroup2Part1[] = [
    {value: 'grater', viewValue: '<' },
    {value: 'less' , viewValue: '>'},
    {value: 'equal' , viewValue: '='},
    {value: 'graterequal' , viewValue: '<='},
    {value: 'lessequal', viewValue: '>='},
    {value: 'notequal', viewValue: '≠'}
  ];
  // 選択肢選択時の不等号(項目グループ2の2)
  opeconditiongroup2part2: OpeConditionGroup2Part2[] = [
    {value: 'equal' , viewValue: '='},
    {value: 'notequal', viewValue: '≠'}
  ];
  // アラート設定数値項目その1
  alertnumvalue: AlertNumSelect[] = [
    {value: 'alertitem-1', ViewValue: '選択肢'},
    {value: 'alertitem-2', ViewValue: '数値・計算式'},
  ];
  // < >などの記号(数値)
  opecondition: OpeCondition[] = [
    {value: 'grater', viewValue: '<' },
    {value: 'less' , viewValue: '>'},
    {value: 'equal' , viewValue: '='},
    {value: 'graterequal' , viewValue: '<='},
    {value: 'lessequal', viewValue: '>='},
    {value: 'notequal', viewValue: '≠'}
  ];
  // アラート設定数値項目(選択肢)
  opecondition2: OpeCondition2[] = [
    {value: '=' , viewValue: '='},
    {value: '≠', viewValue: '≠'}
  ];
  // 整数or小数
  seleteteion: Option[] = [
    {value: 'option-1', viewValue: '整数'},
    {value: 'option-2', viewValue: '小数'}
  ];
  // 整数or小数or選択肢
  optionans: OptionAnswer[] = [
    {value: 'answer-1', ViewValue: '整数'},
    {value: 'answer-2', ViewValue: '小数'},
    {value: 'answer-3', ViewValue: '選択肢'},
  ];

  @ViewChild(MatAccordion) accordion: MatAccordion;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);


  displayedColumns: string[] = ['select', 'id', 'textname', 'value1', 'operation', 'value2'];
  data = Object.assign(NAMES);
  dataSource = new MatTableDataSource<PeriodicElement>(this.data);
  selection = new SelectionModel<PeriodicElement>(true, []);
  numbertd: number;

  constructor(public dialog: MatDialog, private http: HttpClient) {
     console.log(this.data); //テーブルの行
  }
  // 新規ユーザ作成
  createNewUser(id: number): UserData {

    const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ';
    console.log(name);
    return {
      id: id.toString(),
      textname: name
    };
  }

  //登録ボタン
  newSingUp(){
    this.checkboxid = document.getElementById('checklist1');
    this.boxfolderid = document.getElementById('boxfolder');
    this.excelfileid = document.getElementById('excelfilename');
    this.checkboxlist = document.getElementById('checkboxlist');
    console.log(this.checkboxlist.checked);
    this.checkboxlistid = document.getElementsByName('inputchecked');
    this.checklistname = this.checkboxid.value;
    this.boxfoldername = this.boxfolderid.value;
    this.excelfilename = this.excelfileid.value;


    if ( this.checklistname === '' || this.boxfoldername === '' || this.excelfilename === ''){
      this.dialog.open(DialogElementsExampleDialog);
      console.log(this.checkboxlistid);
    }else{
      alert('登録');
    }

  }
  //追加ボタン
   addRow(){
    this.dataSource.data.push(this.createNewUser(this.dataSource.data.length + 1));
    this.dataSource.filter = '';
  }
   /** Whether the number of selected elements matches the total number of rows. */
   isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  //項目グループ1のテーブル削除処理
  deleteGroupAnswer(checknumber){
    const format1 = document.getElementById('answer-card1');
    const format2 = document.getElementById('answer-card2');
    if (checknumber === 'number1'){
      format1.style.display = 'none';
    }else {
      format2.style.display = 'none';
    }
  }
  //削除ボタン
  removeSelectedRows(){

    this.selection.selected.forEach(item => {
      let index: number = this.data.findIndex(d => d === item);
      console.log("No." + index + "が削除されました");
      this.data.splice(index, 1);
      this.numbertd = index;
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.data);
    });
    this.selection = new SelectionModel<PeriodicElement>(true, []);
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
    this.selection.clear() :
    this.dataSource.data.forEach(row => this.selection.select(row));
  }
  removeSelectedRows2(){
    alert('ボタンで削除');
  }
  openAll(){
    alert('test');
  }
  // 項目グループ追加ボタン
  GroupFrameOpen(){
    let countup;
    this.groupspandisp = document.getElementById('numberclick'); // グループ番号
    this.clickcount++;
    countup = this.clickcount; // クリック回数
    console.log(countup + '回目だよ');
    if (this.clickcount === 1){
      this.groupframe = document.getElementById('Group-setting-frame');
      this.groupframe.style.display = 'block';
    // グループ2
    }else if (countup === 2){
      // 項目グループ2を追加した時に追加
      // 1
      const group2numselect1 = document.getElementById('select_group2_numlist1');
      const group2calcselect1 = document.getElementById('select_opton_numlist2');
      const group2choiceselect1 = document.getElementById('select_opton_choice_group2');
      // 2
      const group2num1select2 = document.getElementById('select_num2_group2');
      const group2cal1select2 = document.getElementById('select_option2_numlist2');

      for(var i=0; i < logical.calc_list.length; i++){
          for(var j=0; j < logical.calc_list[1].calc_body.length; j++){
             // 数値
             if (logical.calc_list[i].calc_type  === 'num'){
                  group2numselect1.innerHTML += '<option value="'+ logical.calc_list[i].id + '">' + logical.calc_list[i].calc_body[j].calc_operator + '</option>';
                  group2num1select2.innerHTML += '<option value="'+ logical.calc_list[i].id + '">' + logical.calc_list[i].calc_body[j].calc_operator + '</option>';
             // 計算式
             }else if (logical.calc_list[i].calc_type  === 'calc'){
                  group2calcselect1.innerHTML += '<option value="'+ logical.calc_list[i].id + '">' + logical.calc_list[i].calc_body[j].calc_operator + '</option>';
                  group2cal1select2.innerHTML += '<option value="'+ logical.calc_list[i].id + '">' + logical.calc_list[i].calc_body[j].calc_operator + '</option>';
             // 選択肢
             }else if (logical.calc_list[i].calc_type  === 'choice'){
                  group2choiceselect1.innerHTML += '<option value="'+ logical.calc_list[i].id + '">' + logical.calc_list[i].calc_body[j].calc_operator + '</option>';
             }
          }

      }

      this.groupframe2 = document.getElementById('Group-setting-frame2');
      this.groupframe2.style.display = 'block';
      this.selectOptionName = 'AND';
      this.equalSignGropu3No2 = '項目A';
      this.equalSignGropu3Set2 = '項目B';

    // 項目グループ3追加
    }else if (countup === 3){
      this.groupframe3 = document.getElementById('Group-setting-frame3');
      this.groupframe3.style.display = 'block';
    // 項目グループ4追加
    }else{
      this.groupframe4 = document.getElementById('Group-setting-frame4');
      this.groupframe4.style.display = 'block';
    }
  }
  // Dialogボタン
  addTestGroup(): void{
      alert('dialogチェック');
  }

  // 項目グループ1
  InputOptionAdd(){
    console.log(this.selectOptionConditionAdd);
  }
  alertSelectOption(){
    alert('test');
  }
  // 項目グループ1 #1 アラート
  InputConditionSharp1(){
    console.log(this.selectOptionNameMain);
  }
  //項目グループ2 select処理
  InputCondition(){
    console.log(this.selectOptionName);
    //OR を選択
    if (this.selectOptionName === 'group2-or'){
      console.log('or条件 項目グループ2');

    }else{
      console.log('and条件 項目グループ2');
    }
  }
  //項目グループ2 メイン条件
  Group2MainDisplayInputCondition(){
    this.selectDisplay2OptionName;
  }
  //項目グループ2 select処理 (2段目)
  InputConditionSecond(){
    console.log('項目グループ2の下段論理選択肢は' + this.selectOptionNameSecond);
  }
  InputConditionSecond2(){
    console.log(this.selectOptionNameSecond);
  }
  InputConditionSecond3(){
    console.log('test3');
  }
  //アラート
  AlertequalSignJud(){
    console.log(this.AlertequalSign);
  }
  //アラート条件
  equalSignJud2(){
    console.log(this.equalSign2);
    this.numeselectVal = this.equalSign2;
  }
  equalSignJudAlertNum2(){
    console.log(this.equalSignAlert2);
  }
  equalSignJudAlertCondition2(){
    console.log(this.equalSign2Alert2);
    this.AlertOptionSelectValue2 = this.equalSign2Alert2;
  }
  equal2SignJudAlertCondition2(){
    alert('test');
  }
  //項目グループ 表示項目その1
  numericaItem(){
    console.log('項目グループ2上段1は' + this.numericalItem);
    const selectnumgropu2part1 = document.getElementById('group2num-part1-disp'); //数値
    const rayoutdisplay = document.getElementById('itemgroup2-main');
    const selectcalcgroup2part1 = document.getElementById('group2choice-part1-num'); //計算式
    rayoutdisplay.classList.remove('group2-card-display'); //select選択前のclass指定を削除
    rayoutdisplay.classList.add('group2-card-display-select-setting'); //select選択時
    const textGroup2numpart1 = document.getElementById('group2-select-num-part1');
    const textGroup2choicepart1 = document.getElementById('group2-select-choice-part1');
    const textGroup2calcpart1 = document.getElementById('group2-calc-select-part1');
    const selectchoicegroup2part1 = document.getElementById('group2choice-part1-disp'); //選択肢
    // 数値
    if (this.numericalItem === 'group2-num-select1'){
      selectnumgropu2part1.style.display = 'inline';
      textGroup2numpart1.style.display = 'inline';
      selectcalcgroup2part1.style.display = "none";
      textGroup2calcpart1.style.display = "none";
      selectchoicegroup2part1.style.display = 'none';
      textGroup2choicepart1.style.display = 'none';
    // 計算式
    }else if(this.numericalItem === 'group2-calc-select1'){
      selectnumgropu2part1.style.display = 'none';
      textGroup2numpart1.style.display = 'none';
      selectcalcgroup2part1.style.display = "inline";
      textGroup2calcpart1.style.display = "inline";
      selectchoicegroup2part1.style.display = 'none';
      textGroup2choicepart1.style.display = 'none';

    // 選択肢
    }else{
      selectnumgropu2part1.style.display = 'none';
      textGroup2numpart1.style.display = 'none';
      selectcalcgroup2part1.style.display = "none";
      textGroup2calcpart1.style.display = "none";
      selectchoicegroup2part1.style.display = 'inline';
      textGroup2choicepart1.style.display = 'inline';
    }

  }
  //項目グループ2の2
  equalSignJudGropu2No2(){
    console.log(this.equalSignGropu2No2);
    const numvalgroup2and2 = document.getElementById('group2-numval-part2'); //数値select
    const numtextgroup2and2 = document.getElementById('group2-numvalue-disp2');
    const rayoutdisplay2 = document.getElementById('itemgroup2-main-part2');
    rayoutdisplay2.classList.remove('mat-card-group2-part2');
    rayoutdisplay2.classList.add('group2-card-display-select-setting'); //select選択時
    const chocegroup2and2 = document.getElementById('group2-choiche-part2'); //選択肢select
    const choicetextgroup2and2 = document.getElementById('group2-choice-disp2');
    const calcselectoption2 = document.getElementById('group2-calcval2-part2');
    if (this.equalSignGropu2No2 === 'group2-num-select-lower2'){ //数値
      numvalgroup2and2.style.display = 'inline';
      numtextgroup2and2.style.display = 'inline';
      chocegroup2and2.style.display = 'none';
      choicetextgroup2and2.style.display = 'none';
    }else if(this.equalSignGropu2No2 === 'group2-calc-select-lower2'){ //計算式


    }else{ //選択肢
      numvalgroup2and2.style.display = 'none';
      numtextgroup2and2.style.display = 'none';
      chocegroup2and2.style.display = 'inline';
      choicetextgroup2and2.style.display = 'inline';
    }
  }
  //項目グループ2の３
  equalSignJud2AlertSelect2(){
    console.log(this.select2ConditionAlert2);
    const display2numalert2 = document.getElementById('equalsign2-display2-2'); //数値select
    const display2decialert2 = document.getElementById('equal2sign2-display2-2'); //選択肢select
    const rayoutdsplay2and3 = document.getElementById('itemgroup2-main-part3'); 
    const select2numtext2 = document.getElementById('num2selecttext2');
    const choice2text2    = document.getElementById('num2selectoption2');


    if(this.select2ConditionAlert2 === 'group2-num-select-lower1' ){
      display2numalert2.style.display ='inline';
      select2numtext2.style.display ='inline';
      display2decialert2.style.display ='none';
      choice2text2.style.display ='none';
    }else{
      display2numalert2.style.display ='none';
      select2numtext2.style.display ='none';
      display2decialert2.style.display ='inline';
      choice2text2.style.display ='inline';
    }

    rayoutdsplay2and3.classList.remove('mat-card-group2-part2');
    rayoutdsplay2and3.classList.add('group2-card-display-select-setting'); //select選択時
  }

  //項目グループ2の4
  equal2SignJudGropu2No2(){
    console.log(this.equal2SignGropu2No2);
    const display4num = document.getElementById('group2-numval2-part2'); //数値select
    const display4numtext = document.getElementById('group2-numvalue2-disp2');
    const display4select = document.getElementById('group2-choiche2-part2'); //選択肢select
    const display4selecttext = document.getElementById('group2-choice2-disp2');

    const display2num4alert4 = document.getElementById('item2group2-main-part2');

    if (this.equal2SignGropu2No2 === 'group2-num-select-lower1'){
      //alert('4番目の数値');
      display4num.style.display = 'inline';
      display4numtext.style.display = 'inline';
      display4select.style.display = 'none';
      display4selecttext.style.display = 'none';

    }else{
      //alert('4番目の選択値');
      display4num.style.display = 'none';
      display4numtext.style.display = 'none';
      display4select.style.display = 'inline';
      display4selecttext.style.display = 'inline';

    }

    display2num4alert4.classList.remove('mat-card-group2-part2');
    display2num4alert4.classList.add('group2-card-display-select-setting'); //select選択時

  }


  // 項目グループ3 1
  /*
  equalSignJudGropu2No3(): void{
    const group3num1 = document.getElementById('group3-numval-part1');
    const group3choice1 = document.getElementById('group3-choiche-part1');
    const group3numtext1 = document.getElementById('group3-numvalue-disp1');
    const group3choicetext1 = document.getElementById('group3-choice-disp1');
    if ( this.equalSignGropu2No3  === 'group2-num-select-lower1'){
      group3num1.style.display = 'inline';
      group3numtext1.style.display = 'inline';
      group3choice1.style.display = 'none';
      group3choicetext1.style.display = 'none';
    }else{
      group3num1.style.display = 'none';
      group3numtext1.style.display = 'none';
      group3choice1.style.display = 'inline';
      group3choicetext1.style.display = 'inline';
    }

  }
  */

  // 項目グループ3 2
  /*
  equalSignJudGropu3No2(): void{
    const group3numarea2 = document.getElementById('group3-numval2-part1');
    const group3numtext2 = document.getElementById('group3-numvalue2-disp1');
    const group3selectarea2 = document.getElementById('group3-choiche2-part1');
    const group3selecttext2 = document.getElementById('group3-choice2-disp2');
    if(this.equalSignGropu3Set2 === 'group2-num-select-lower1'){
        group3numarea2.style.display ='inline';
        group3numtext2.style.display ='inline';
        group3selectarea2.style.display ='none';
        group3selecttext2.style.display ='none';
    }else{
        group3numarea2.style.display ='none';
        group3numtext2.style.display ='none';
        group3selectarea2.style.display ='inline';
        group3selecttext2.style.display ='inline';
    }
  }
  */

  //項目グループ4 1
  equalSignJudGropu4No1(){
    console.log(this.equalSignGropu4No1);
    const group4num = document.getElementById('group4-numval-part1');
    const group4textnum = document.getElementById('group4-numvalue-disp1');
    const group4choice = document.getElementById('group4-choiche-part1');
    const group4textchoice = document.getElementById('group4-choice-disp1');
    if ( this.equalSignGropu4No1 === 'group2-num-select-lower1'){
      group4num.style.display = 'inline';
      group4textnum.style.display = 'inline';
      group4choice.style.display = 'none';
      group4textchoice.style.display = 'none';
    }else{
      group4num.style.display = 'none';
      group4textnum.style.display = 'none';
      group4choice.style.display = 'inline';
      group4textchoice.style.display = 'inline';
    }
  }

  equalSignJudGropu4No2(){
      //console.log(this.equalSignGropu4No2);
      const group4num2 = document.getElementById('group4-numval2-part1');
      const group4select2  = document.getElementById('group4-choiche2-part1');
      const group4textnum2 = document.getElementById('group4-numvalue2-disp1');
      const group4textchoice2 = document.getElementById('group4-choice2-disp1');

    if(this.equalSignGropu4No2 === 'group2-num-select-lower1'){
        group4num2.style.display = 'inline';
        group4textnum2.style.display = 'inline';
        group4select2.style.display = 'none';
        group4textchoice2.style.display = 'none';
    }else{
        group4num2.style.display = 'none';
        group4textnum2.style.display = 'none';
        group4select2.style.display = 'inline';
        group4textchoice2.style.display = 'inline';
    }

  }
  //アラート 1
  alertNumVal(){
    console.log(this.alertNumerical);
  }
  //アラート2
  equalSignJudAlertSelect2(){
    console.log(this.selectConditionAlert2);

  }
  //条件
  alertNumValAdd(){
    console.log(this.equalSignAdd1);
    const eqadd1 = document.getElementById('equalsign-area-add1');
    const aldnadd1 = document.getElementById('alert-display-num-add1');
    const adcoadd1 = document.getElementById('alert-display-condition-add1');
    const adiseadd1 = document.getElementById('alert-display-select-add1');
}
  //アラート条件
  AlertOptonSelect2(){
    console.log(this.equalSignAdd2);
  }

  ConditonAlert1(){
    this.countup++;

    const conditionadd1 = document.getElementById('condition-add1');
    const textareaadd1 = document.getElementById('text-area-add1');
    conditionadd1.style.display = 'inline';
    textareaadd1.style.display = 'block';

    //2行目追加
    const testestes = document.getElementById('condition-add2');
    if (this.countup === 2){
      testestes.style.display = 'block';
    }
    console.log(this.countup + '回目');
    console.log(this.equalSignAdd1);

    //1回目の時
    if (this.countup === 1){
      //条件ボタンが押されたタイミングでoptionを設定
      var sample_alert_ui = document.getElementById('select_sample_list2');

        for(var i=0; i < logical.calc_list.length; i++){
          if(logical.calc_list[i].calc_type  === 'calc'){
            for(var j=0; j < logical.calc_list[i].calc_body.length; j++){
              this.calc_operater =  logical.calc_list[i].calc_body[j].calc_operator; //option表示
              sample_alert_ui.innerHTML += '<option value="'+ logical.calc_list[i].id + '">' + this.calc_operater + '</option>';
            }
          }
        }
    }else if(this.countup === 2){
       //条件ボタンが押されたタイミングでoptionを設定
       var sample_alert_ui2 = document.getElementById('select_sample_list3');
       for(var i=0; i < logical.calc_list.length; i++){

          if(logical.calc_list[i].calc_type  === 'calc'){
            for(var j=0; j < logical.calc_list[i].calc_body.length; j++){
              this.calc_operater =  logical.calc_list[i].calc_body[j].calc_operator; //option表示
              sample_alert_ui2.innerHTML += '<option value="' + logical.calc_list[i].id + '">' + this.calc_operater + '</option>';
            }
          }else{
            for(var k=0; k < logical.calc_list[i].calc_list.length; k++){
              console.log(`id:${logical.calc_list[i].calc_list[k].id}`);
            }
          }

        }

    }else{
      alert('条件ボタン押されたよ');
    }
  }
  //アラート2
  ConditonAlert2(){
    alert('アラート2');
  }
  //グループ2 数値 その2
  SelectNumValueGroup2(){
    console.log(this.Group2Part2Num);
  }
  SelectCalcValueGroup2(){
    console.log(this.Group2Part2Calc2);
  }
  //項目グループ2 数値 その3
  equal2SignJudAlertNum2(){
    console.log(this.equalSignDisp1Alert2);
  }
  //グループ2 数値 その4
  Select2NumValueGroup2(){
    this.Group2Part2Num2;
  }
  SelectChiceGroup3(){
    this.numberGrou3ValueChoice1 = this.Group3Part1Choce;
  }
  //項目グループ3 1
  SelectNumValueGroup3(){
    console.log();
  }
  //項目グループ3 2
  SelectNumValueGroup3No2(){
    console.log(this.equalSignGropu3No1);
  }
  SelectNumValueGroup4(){
    console.log('test');
  }
  //group 選択肢 その2
  SelectChiceGroup2(){
    this.numberGroupValueChoice2 = this.Group2Part2Choce;
    console.log(this.numberGroupValueChoice2);
  }
  //group2 3つめ
  Select2ChiceGroup2(){
    console.log(this.Group2Part2Choce2);
  }
  SelectChiceGroup4(){
    this.Group4Part2ChoiceText = this.Group4Part2Choce;
  }
  SelectChiceGroup4Part2(){
    this.Group4Part2ChoiceText2 = this.Group4Part2Choce2;
  }
  //group2 
  equalSignGroup2ChiceJud(){
   console.log(this.equalGroup2ChoicePart1);
   this.Group2textChoicePart1 = this.equalGroup2ChoicePart1; //不等号入力
  }
  equalSignGroup2ChiceJud2(){
    console.log(this.equalGroup2ChoicePart2);
  }
  equalSignJudMain1(){
    console.log(this.equalGroup2NumPart1);
  }
  // 項目グループ1 #1
  SelectOptionValue(){
    console.log(this.selectedOption);
    const selectedvalue = document.getElementById('option-option1-areas');
    const inputtextarea = document.getElementById('option-selected1');
    if (this.selectedOption === 'answer-3'){ //選択肢
      selectedvalue.style.display = 'none';
      inputtextarea.style.display = 'inline';
    }else{ //整数・小数
      selectedvalue.style.display = 'inline';
      inputtextarea.style.display =  'none';
    }
  }
  // 項目グループ1 #2
  SelectOptionValue2(){
    alert(this.selectGroup1OptionSharp2);
    const selectedvalue2 = document.getElementById('option-option1-areas2');
    const inputtextarea2 = document.getElementById('option-selected1-1');
    if (this.selectGroup1OptionSharp2 === 'answer-3'){
      selectedvalue2.style.display = 'inline';
      inputtextarea2.style.display = 'inline';
    }else{
      selectedvalue2.style.display = 'none';
      inputtextarea2.style.display = 'none';
    }
  }

  // 項目グループ全体の削除
  deleteGroupCard(groupname: any){

    if (groupname === 'group2'){
      this.groupframe2.style.display = 'none';
    }else if (groupname === 'group3'){
      this.groupframe3.style.display = 'none';
    }else{
      this.groupframe4.style.display = 'none';
    }
  }
  //項目グループ1の項目設定ボタン
  addGroup(){
    alert('項目グループ');
  }
  //アラートボタン #1
  alertDisplay(){
    console.log('アラートボタン1');
    const alertdisplay = document.getElementById('alert-class-area');  //#1
    alertdisplay.style.display = 'inline';

    //アラートボタンのタイミングで表示
    var sample_ui = document.getElementById('select_sample_list');

      for(var i=0; i < logical.calc_list.length; i++){
          console.log(logical.calc_list[i].id); //id

          if(logical.calc_list[i].calc_type  === 'calc'){
            
            for(var j=0; j < logical.calc_list[1].calc_body.length; j++){
              console.log(logical.calc_list[i].calc_body[j].calc_operator);
              this.calc_operater =  logical.calc_list[i].calc_body[j].calc_operator; //option表示
              sample_ui.innerHTML += '<option value="'+ logical.calc_list[i].id + '">' + this.calc_operater + '</option>';
            }
            
          }
      }
    
  }
  //アラートボタン #2
  alertDisplaySharp(){
    const alertdisplay2 = document.getElementById('alert-class-area2'); //#2
    alertdisplay2.style.display = 'inline';

    //アラートボタンの押下するタイミングで表示
    var sample_ui_sharp02 = document.getElementById('select_sample_list_sharp2');

    for(var i=0; i < logical.calc_list.length; i++){
      console.log(logical.calc_list[i].id); //id

      if(logical.calc_list[i].calc_type  === 'calc'){
        for(var j=0; j < logical.calc_list[i].calc_body.length; j++){
          this.calc_operater =  logical.calc_list[i].calc_body[j].calc_operator; //option表示
          sample_ui_sharp02.innerHTML += '<option value="' + logical.calc_list[i].id + '">' + this.calc_operater + '</option>';
        }
      }else{
        for(var k=0; k < logical.calc_list[i].calc_list.length; k++){
            console.log(`id:${logical.calc_list[i].calc_list[k].id}`);
        }
      }
  　}
  }

  settingOpe(conditionsetting){
    console.log('test');
  }

  //クリアボタン
  onClearClick(id_list){
    alert('クリア' + id_list);
    if(id_list === 'clear_btn1'){
      document.getElementById('itemgroup2-main').style.display = 'none';
    }else if(id_list === 'clear_btn2'){
      document.getElementById('itemgroup2-main-part2').style.display = 'none';
    }else if(id_list === 'clear_btn3'){
      document.getElementById('itemgroup2-main-part3').style.display ='none';
    }else{
      document.getElementById('item2group2-main-part2').style.display ='none';
    }

  }

  //チェックリスト一番下の登録ボタン
  CheckListForm(){
     //JSONファイルからのサンプルロジック
      for(var i=0; i < logical.calc_list.length; i++){
         console.log(`Jsonデータ==id:${logical.calc_list[i].id}, calc_type:${logical.calc_list[i].calc_type}`);
         if(logical.calc_list[i].calc_type  === 'calc'){
            for(var j=0; j < logical.calc_list[i].calc_body.length; j++){
                console.log(`calc_body-> calc_left -> type:${logical.calc_list[i].calc_body[j].calc_left.type}`);
                console.log(`calc_operater:${logical.calc_list[i].calc_body[j].calc_operator}`);
                this.calc_operater =  logical.calc_list[i].calc_body[j].calc_operator; // option表示
                console.log(logical.calc_list[i].calc_body[j].calc_left.id + '/'
                + logical.calc_list[i].calc_body[j].calc_left.type + '/'
                + logical.calc_list[i].calc_body[j].calc_left.label); // calc_leftデータ全て
                console.log(this.calc_operater); // 不等号データ
            }
         }
      }

    //項目Group1
    if (this.alertNumeValue === undefined){
      console.log('アラート入力値の数値が未入力のものがあります。');
    }else{
      if (isNaN(this.alertNumeValue)){
        console.log('アラート入力に数値でないものが含まれています');
      }else{
        //回答1(#1)と回答2(#2)をANDORを用いて比較する
        console.log(this.AlertequalSign);
        console.log(this.equalSign2);
        console.log(this.alertNumeValue);
      }
    }

    /*項目Group2*/
    //1段目
    if(this.selectDisplay2OptionName === undefined){
        alert('1番目の条件が選択されていません');
        return;
    }else{
        if(this.selectDisplay2OptionName === 'AND'){
            /*演算子全て数値選択の時*/
            if(this.numericalItem === 'group2-num-select1' && this.equalSignGropu2No2 === 'group2-num-select-lower1'){
                if(this.numberGroupValue === undefined || this.numberGroupValue2 === undefined){
                      console.log('数値が未入力のものがあります。');
                      return;
                }else{
                     //数値チェック
                     if(isNaN(this.numberGroupValue) || isNaN(this.numberGroupValue2)){
                        console.log('テキストに数値でないものが含まれています');
                        return;
                     }else{
                        if(this.selectOptionNameSecond === undefined){ //未定義時
                            alert('2番目の条件が選択されていません');
                            return;
                        }else{ //論理演算
                          if(this.selectOptionNameSecond === 'AND'){
                            /*演算子全て数値の場合は、条件分岐*/
                            if(this.AlertNumInput2 === undefined || this.numberGroup2Value2 === undefined){ 
                                console.log('数値が未入力のものがあります。');
                                return;
                            }else{
                                //数値チェック
                                if(isNaN(this.AlertNumInput2) || isNaN(this.numberGroup2Value2)){
                                  alert('入力値に数値でないものが含まれています。');
                                  return;
                                }else{
                                  //比較演算子
                                  if(this.equalSignDisp1Alert2 === undefined || this.Group2Part2Num2 === undefined){
                                    alert('比較演算子が設定されていないものがあります。');
                                    return;
                                  }else{
                                        if(this.equalGroup2NumPart1 === 'grater'){

                                            if(this.Group2Part2Num === 'grater'){ //<
                                              
                                            }else if(this.Group2Part2Num === 'less'){ //>
                                              
                                            }
                                        }else if(this.equalGroup2NumPart1 === 'less'){ //>
                                            if(this.Group2Part2Num === 'grater'){
          
                                            }else if(this.Group2Part2Num === 'less'){ //>
                                                if(this.equalSignDisp1Alert2 === 'grater'){

                                                }else if(this.equalSignDisp1Alert2 === 'less'){

                                                }else if(this.equalSignDisp1Alert2 === 'equal'){

                                                }else if(this.equalSignDisp1Alert2 === 'graterequal'){

                                                }
                                            }
                                        }
                                    
                                  }
                                }
                            }
                          }else{

                          }
                        }
                       
                        
                     }
                }
            }else{
              alert('選択肢もあるパターンです');
              return;
            }
          
        }else{ //OR
            console.log('OR');
           /*演算子全て数値選択の時、条件分岐*/
            if(this.numericalItem === 'group2-num-select1' && this.equalSignGropu2No2 === 'group2-num-select-lower1'){
              //未入力チェック
              if(this.numberGroupValue === undefined || this.numberGroupValue2 === undefined){
                    console.log('数値が未入力のものがあります。');
                    return;
              }else{  
                      //数値チェック
                      if(isNaN(this.numberGroupValue) || isNaN(this.numberGroupValue2)){
                          alert('テキストに数値でないものが含まれています');
                          return;
                      }else{
                            if(this.selectOptionNameSecond === undefined){ //未定義時
                                    alert('2番目の条件が選択されていません');
                                    return;
                            }else{ //論理演算
                                if(this.selectOptionNameSecond === 'AND'){ //AND
                                      /*演算子全て数値の場合は、条件分岐*/
                                      if(this.AlertNumInput2 === undefined || this.numberGroup2Value2 === undefined){ 
                                          console.log('数値が未入力のものがあります。');
                                          return;
                                      }else{
                                           //数値チェック
                                           if(isNaN(this.AlertNumInput2) || isNaN(this.numberGroup2Value2)){
                                              alert('入力値に数値でないものが含まれています。');
                                              return;
                                           }else{
                                              //比較演算子
                                              if(this.equalSignDisp1Alert2 === undefined || this.Group2Part2Num2 === undefined){
                                                  alert('比較演算子が設定されていないものがあります。');
                                                  return;
                                              }else{

                                                    if(this.equalGroup2NumPart1 === 'grater'){ // <

                                                    }else if(this.equalGroup2NumPart1 === 'less'){ // >
                                                        if(this.Group2Part2Num === 'grater'){

                                                        }else if(this.Group2Part2Num === 'less'){ // >
                                                              
                                                              if(this.equalSignDisp1Alert2 === 'grater'){

                                                              }else if(this.equalSignDisp1Alert2 === 'less'){

                                                              }else if(this.equalSignDisp1Alert2 === 'equal'){
                                                                   
                                                                  if(this.Group2Part2Num2 === 'grater'){

                                                                  }else if(this.Group2Part2Num2 ===　'less'){

                                                                  }else if(this.Group2Part2Num2 ===　'equal'){
                                                                     
                                                                     window.confirm('表示条件は' + this.selectDisplay2OptionName 
                                                                     + '\n1行目は(等号) ">"(入力値)' + this.numberGroupValue 
                                                                     + '\n2行目は(等号) ">"(入力値)' + this.numberGroupValue2
                                                                     + '\n表示条件は' + this.selectOptionNameSecond
                                                                     + '\n3行目は(等号) "="(入力値)' + this.AlertNumInput2
                                                                     + '\n4行目は(等号) "="(入力値)' + this.numberGroup2Value2
                                                                     );

                                                                      
                                                                  }else if(this.Group2Part2Num2 === 'graterequal'){

                                                                  }else if(this.Group2Part2Num2 === 'lessequal'){

                                                                  }else{

                                                                  }
                                                              }else if(this.equalSignDisp1Alert2 === 'graterequal'){

                                                              }else if(this.equalSignDisp1Alert2 === 'lessequal'){

                                                              }else{

                                                              }

                                                        }else if(this.Group2Part2Num === 'equal'){

                                                        }else if(this.Group2Part2Num === 'graterequal'){

                                                        }else if(this.Group2Part2Num === 'lessequal'){
                                                          
                                                        }else{

                                                        }

                                                    }else if(this.equalGroup2NumPart1 === 'equal'){ // =

                                                    }else if(this.equalGroup2NumPart1 === 'graterequal'){ // <=

                                                    }else if(this.equalGroup2NumPart1 === 'lessequal'){ // >=

                                                    }else{ //≠

                                                    }



                                              }

                                           }
                                      }
                                }else{ //OR
                                      //演算子全て数値の場合
                                }
                            }
                              
                            
                     
                        }
                    }
           }else{
              alert('選択肢もあるパターンです');
              return;
           }
            

        }
    }
  }
   // 編集ボタンメイン
   openDialog(): void {
     const dialogOpenEdit = this.dialog.open(FrameDialogEdit, {
        width: '30%',
        data: {selectOptionName: this}
     });

     dialogOpenEdit.afterClosed().subscribe(result => {
       console.log('OK');
     });
  }
  // 編集ボタンサブ
  subDialog(): void {
    const DialogSubRef = this.dialog.open(FrameDialogSubEdit, {
        width: '70%'
    });

    DialogSubRef.afterClosed().subscribe(result => {
      console.log('OK');
    });
  }
  //削除ボタン
  DialogDelete(): void {
    //alert('削除');
    const DeleteDialogRef = this.dialog.open(FrameDeleteDialog, {
    });
  }
  //サブブロック追加
  blockAdd(): void {
    this.NoSetTitle = '設定されていません';
    const sub_disp = document.getElementById('sub-card-area');
    sub_disp.style.display = 'block';
  }
  blockAddSub(): void {
    const nest_disp = document.getElementById('sub-nest-block');
    nest_disp.style.display = 'block';
  }
  // ブロック追加新規
  NewSetting(): void {
    //alert('新規');
    const DialogNoSetRef = this.dialog.open(FrameNoSetCreate, {
      width: '70%'
    });
    DialogNoSetRef.afterClosed().subscribe(result => {
      this.NoSetTitle = '';
      const rowseting = document.getElementById('sub-new-setting-row');
      rowseting.style.display = 'block';
      const btndistop = document.getElementById('btn-new-area');
      btndistop.style.display = 'none';
      const rowaddarea = document.getElementById('btn-block-subarea');
      rowaddarea.style.display = 'flex';
    });
  }
  //サブネストテーブル追加
  SubAddTbMain(): void {
    //alert('サブネストテーブル追加');
    const nest2_disp = document.getElementById('sub-nest2-line');
    nest2_disp.style.display = 'block';
  }
  //サブテーブル追加
  SubAddTb(): void {
    const sub_tb = document.getElementById('sub-nest-line');
    sub_tb.style.display = 'block';
  }
  //行追加
  LineFrame(): void {
    //alert('行追加');
    const dialogCreateEd = this.dialog.open(DialogCreateSet, {
      width: '70%'
    });
    dialogCreateEd.afterClosed().subscribe(result => {
      const line_disp = document.getElementById('line-add-frame');
      line_disp.style.display = 'block';
    });
  }
  ngOnInit(): void {
  } // end Oninit


} // end implements OnInit


// 新規テーブル作成
const NAMES: PeriodicElement[] = [
  {id: '1', textname: '計算式1'}
];

// 基本情報の内容不備時dialog
@Component({
  selector: "dialog-elements-example",
  templateUrl: "./dialog-elements-example-dialog.html",
})
export class DialogElementsExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogElementsExampleDialog>) {}

    onNoClick(): void{
      this.dialogRef.close();
    }
}
// 新規作成dialog
@Component({
  selector: "dialog-create-setting",
  templateUrl: "dialog-create-setting.html",
})
export class DialogCreateSet {
  constructor(
    public dialogCreateEdit: MatDialogRef<DialogCreateSet>
  ){}
  CreateTb(): void{
    this.dialogCreateEdit.close();
  }
  CancelCreateClose(): void{
    this.dialogCreateEdit.close();
  }
}
// 未設定時のdialog
@Component({
  selector: "dialog-noset-create-setting",
  templateUrl: "dialog-noset-create-setting.html",
})
export class FrameNoSetCreate {
  constructor(
    public dialogNoSetRef: MatDialogRef<FrameNoSetCreate>
  ){}
  CreateNewSetBtn(): void{
    this.dialogNoSetRef.close();
  }
  CancelNosetCreate(): void{
    this.dialogNoSetRef.close();
  }
}


// 編集ボタンのdialog
@Component({
  selector: "frame-dialogoverview-edit",
  templateUrl: "frame-dialogoverview-edit.html",
})
export class FrameDialogEdit {

  constructor(
    public dialogOpenEdit: MatDialogRef<FrameDialogEdit>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onNoClickSecond(): void { // キャンセルボタン
       this.dialogOpenEdit.close();
    }

}
// 編集ボタンdalogサブ
@Component({
  selector: "dialog-sub-page",
  templateUrl: "dialog-sub-page.html",
})
export class FrameDialogSubEdit {

  constructor(
    public dialogClosed: MatDialogRef<FrameDialogSubEdit>,
  ){}
  CancelClose(): void{
   this.dialogClosed.close();
  }
}
// 削除ボタンdialog
@Component({
  selector: "dalog-delete-frame",
  templateUrl: "dalog-delete-frame.html",
})
export class FrameDeleteDialog {

  constructor(
    public dialogCloseCanseld: MatDialogRef<FrameDeleteDialog>,
  ){}
  DialogDeleteCancel(): void{
    this.dialogCloseCanseld.close();
  }
  SetCloseClick(): void{
    this.dialogCloseCanseld.close();
  }

}




