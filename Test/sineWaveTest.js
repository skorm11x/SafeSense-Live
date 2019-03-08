/***
Fills 16 output channels with sine wave data. Phase offset starts at index
0.Each returned array of
16 values serves as one sensor point per time displayed, where time is defined
in a 250ms update speed.
Creates a triangle wave eh close enough atm.
**/
exports.getSineTest = function(modifier){
    var startValArr = [930+modifier,940+modifier,950+modifier,960+modifier,
      970+modifier,980+modifier,990+modifier,1000+modifier,1010+modifier,
      1020+modifier,1030+modifier,1040+modifier,1050+modifier,1060+modifier,
      1070+modifier,1080+modifier];
    return startValArr;
};
