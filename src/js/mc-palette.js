class McPalette
{
    static apply_palette(palette_index) {
        for (let i = 0; i < 16; i++)
            McPalette.palette[i][1] = McPalette.basic_palettes[palette_index].entries[i];
    }

    static set_light_mode(light) {
        let idx = light ? 1 : 0;
        McPalette.default_fg = McPalette.default_fgs[idx];
        McPalette.default_bg = McPalette.default_bgs[idx];
    }
}


/*
 * Default colors for dark and light modes.
 */
McPalette.default_fgs = [ '#AAAAAA', '#000000' ];
McPalette.default_bgs = [ '#000000', '#FFFFFF' ];

McPalette.default_fg = '';
McPalette.default_bg = '';


/*
 * A couple of possibilities for the first 16 colors.
 * They'll appear on the UI in the order listed below. It begins with the default entry Linux,
 * and continues in (mostly) alphabetical order.
 */
McPalette.basic_palettes = [
    {
        // From /etc/console-setup/vtrgb.vga, also repeated in GNOME Terminal's source
        name: "Linux",
        entries: [
            '#000000', '#AA0000', '#00AA00', '#AA5500', '#0000AA', '#AA00AA', '#00AAAA', '#AAAAAA',
            '#555555', '#FF5555', '#55FF55', '#FFFF55', '#5555FF', '#FF55FF', '#55FFFF', '#FFFFFF'
        ]
    },
    {
        // From GNOME Terminal's src/profile-editor.cc
        name: "GNOME Terminal",
        entries: [
            '#171421', '#C01C28', '#26A269', '#A2734C', '#12488B', '#A347BA', '#2AA1B3', '#D0CFCC',
            '#5E5C64', '#F66151', '#33D17A', '#E9AD0C', '#2A7BDE', '#C061CB', '#33C7DE', '#FFFFFF'
        ]
    },
    {
        // From GNOME Terminal's src/profile-editor.cc
        name: "GNOME old (Tango)",
        entries: [
            '#2E3436', '#CC0000', '#4E9A06', '#C4A000', '#3465A4', '#75507B', '#06989A', '#D3D7CF',
            '#555753', '#EF2929', '#8AE234', '#FCE94F', '#729FCF', '#AD7FA8', '#34E2E2', '#EEEEEC'
        ]
    },
    {
        // From rxvt-unicode's src/init.C if XTERM_COLORS is undefined, also repeated in GNOME Terminal's source
        name: "Rxvt traditional",
        entries: [
            '#000000', '#CD0000', '#00CD00', '#CDCD00', '#0000CD', '#CD00CD', '#00CDCD', '#FAEBD7',
            '#404040', '#FF0000', '#00FF00', '#FFFF00', '#0000FF', '#FF00FF', '#00FFFF', '#FFFFFF'
        ]
    },
    {
        // From rxvt-unicode's src/init.C if XTERM_COLORS is defined (which is the default)
        name: "Urxvt",
        entries: [
            '#000000', '#CD0000', '#00CD00', '#CDCD00', '#0000CD', '#CD00CD', '#00CDCD', '#E5E5E5',
            '#4D4D4D', '#FF0000', '#00FF00', '#FFFF00', '#0000FF', '#FF00FF', '#00FFFF', '#FFFFFF'
        ]
    },
    {
        // From xterm's XTerm.ad (and X11's rgb.txt), also repeated in GNOME Terminal's source
        name: "Xterm",
        entries: [
            '#000000', '#CD0000', '#00CD00', '#CDCD00', '#0000EE', '#CD00CD', '#00CDCD', '#E5E5E5',
            '#7F7F7F', '#FF0000', '#00FF00', '#FFFF00', '#5C5CFF', '#FF00FF', '#00FFFF', '#FFFFFF'
        ]
    }
];

/*
 * The 256-color palette.
 * The first 16 entries vary heavily across terminals, can be set from any of basic_palettes' items.
 * The next 240 entries are the same across all terminals I'm aware of.
 */
McPalette.palette = [
    // basic dark colors; RGB values will be filled in later
    [ 'black',         '' ],  //   0
    [ 'red',           '' ],  //   1
    [ 'green',         '' ],  //   2
    [ 'brown',         '' ],  //   3
    [ 'blue',          '' ],  //   4
    [ 'magenta',       '' ],  //   5
    [ 'cyan',          '' ],  //   6
    [ 'lightgray',     '' ],  //   7

    // basic light colors; RGB values will be filled in later
    [ 'gray',          '' ],  //   8
    [ 'brightred',     '' ],  //   9
    [ 'brightgreen',   '' ],  //  10
    [ 'yellow',        '' ],  //  11
    [ 'brightblue',    '' ],  //  12
    [ 'brightmagenta', '' ],  //  13
    [ 'brightcyan',    '' ],  //  14
    [ 'white',         '' ],  //  15

    // 6x6x6 color cube
    [ 'rgb000', '#000000' ],  //  16
    [ 'rgb001', '#00005F' ],  //  17
    [ 'rgb002', '#000087' ],  //  18
    [ 'rgb003', '#0000AF' ],  //  19
    [ 'rgb004', '#0000D7' ],  //  20
    [ 'rgb005', '#0000FF' ],  //  21
    [ 'rgb010', '#005F00' ],  //  22
    [ 'rgb011', '#005F5F' ],  //  23
    [ 'rgb012', '#005F87' ],  //  24
    [ 'rgb013', '#005FAF' ],  //  25
    [ 'rgb014', '#005FD7' ],  //  26
    [ 'rgb015', '#005FFF' ],  //  27
    [ 'rgb020', '#008700' ],  //  28
    [ 'rgb021', '#00875F' ],  //  29
    [ 'rgb022', '#008787' ],  //  30
    [ 'rgb023', '#0087AF' ],  //  31
    [ 'rgb024', '#0087D7' ],  //  32
    [ 'rgb025', '#0087FF' ],  //  33
    [ 'rgb030', '#00AF00' ],  //  34
    [ 'rgb031', '#00AF5F' ],  //  35
    [ 'rgb032', '#00AF87' ],  //  36
    [ 'rgb033', '#00AFAF' ],  //  37
    [ 'rgb034', '#00AFD7' ],  //  38
    [ 'rgb035', '#00AFFF' ],  //  39
    [ 'rgb040', '#00D700' ],  //  40
    [ 'rgb041', '#00D75F' ],  //  41
    [ 'rgb042', '#00D787' ],  //  42
    [ 'rgb043', '#00D7AF' ],  //  43
    [ 'rgb044', '#00D7D7' ],  //  44
    [ 'rgb045', '#00D7FF' ],  //  45
    [ 'rgb050', '#00FF00' ],  //  46
    [ 'rgb051', '#00FF5F' ],  //  47
    [ 'rgb052', '#00FF87' ],  //  48
    [ 'rgb053', '#00FFAF' ],  //  49
    [ 'rgb054', '#00FFD7' ],  //  50
    [ 'rgb055', '#00FFFF' ],  //  51
    [ 'rgb100', '#5F0000' ],  //  52
    [ 'rgb101', '#5F005F' ],  //  53
    [ 'rgb102', '#5F0087' ],  //  54
    [ 'rgb103', '#5F00AF' ],  //  55
    [ 'rgb104', '#5F00D7' ],  //  56
    [ 'rgb105', '#5F00FF' ],  //  57
    [ 'rgb110', '#5F5F00' ],  //  58
    [ 'rgb111', '#5F5F5F' ],  //  59
    [ 'rgb112', '#5F5F87' ],  //  60
    [ 'rgb113', '#5F5FAF' ],  //  61
    [ 'rgb114', '#5F5FD7' ],  //  62
    [ 'rgb115', '#5F5FFF' ],  //  63
    [ 'rgb120', '#5F8700' ],  //  64
    [ 'rgb121', '#5F875F' ],  //  65
    [ 'rgb122', '#5F8787' ],  //  66
    [ 'rgb123', '#5F87AF' ],  //  67
    [ 'rgb124', '#5F87D7' ],  //  68
    [ 'rgb125', '#5F87FF' ],  //  69
    [ 'rgb130', '#5FAF00' ],  //  70
    [ 'rgb131', '#5FAF5F' ],  //  71
    [ 'rgb132', '#5FAF87' ],  //  72
    [ 'rgb133', '#5FAFAF' ],  //  73
    [ 'rgb134', '#5FAFD7' ],  //  74
    [ 'rgb135', '#5FAFFF' ],  //  75
    [ 'rgb140', '#5FD700' ],  //  76
    [ 'rgb141', '#5FD75F' ],  //  77
    [ 'rgb142', '#5FD787' ],  //  78
    [ 'rgb143', '#5FD7AF' ],  //  79
    [ 'rgb144', '#5FD7D7' ],  //  80
    [ 'rgb145', '#5FD7FF' ],  //  81
    [ 'rgb150', '#5FFF00' ],  //  82
    [ 'rgb151', '#5FFF5F' ],  //  83
    [ 'rgb152', '#5FFF87' ],  //  84
    [ 'rgb153', '#5FFFAF' ],  //  85
    [ 'rgb154', '#5FFFD7' ],  //  86
    [ 'rgb155', '#5FFFFF' ],  //  87
    [ 'rgb200', '#870000' ],  //  88
    [ 'rgb201', '#87005F' ],  //  89
    [ 'rgb202', '#870087' ],  //  90
    [ 'rgb203', '#8700AF' ],  //  91
    [ 'rgb204', '#8700D7' ],  //  92
    [ 'rgb205', '#8700FF' ],  //  93
    [ 'rgb210', '#875F00' ],  //  94
    [ 'rgb211', '#875F5F' ],  //  95
    [ 'rgb212', '#875F87' ],  //  96
    [ 'rgb213', '#875FAF' ],  //  97
    [ 'rgb214', '#875FD7' ],  //  98
    [ 'rgb215', '#875FFF' ],  //  99
    [ 'rgb220', '#878700' ],  // 100
    [ 'rgb221', '#87875F' ],  // 101
    [ 'rgb222', '#878787' ],  // 102
    [ 'rgb223', '#8787AF' ],  // 103
    [ 'rgb224', '#8787D7' ],  // 104
    [ 'rgb225', '#8787FF' ],  // 105
    [ 'rgb230', '#87AF00' ],  // 106
    [ 'rgb231', '#87AF5F' ],  // 107
    [ 'rgb232', '#87AF87' ],  // 108
    [ 'rgb233', '#87AFAF' ],  // 109
    [ 'rgb234', '#87AFD7' ],  // 110
    [ 'rgb235', '#87AFFF' ],  // 111
    [ 'rgb240', '#87D700' ],  // 112
    [ 'rgb241', '#87D75F' ],  // 113
    [ 'rgb242', '#87D787' ],  // 114
    [ 'rgb243', '#87D7AF' ],  // 115
    [ 'rgb244', '#87D7D7' ],  // 116
    [ 'rgb245', '#87D7FF' ],  // 117
    [ 'rgb250', '#87FF00' ],  // 118
    [ 'rgb251', '#87FF5F' ],  // 119
    [ 'rgb252', '#87FF87' ],  // 120
    [ 'rgb253', '#87FFAF' ],  // 121
    [ 'rgb254', '#87FFD7' ],  // 122
    [ 'rgb255', '#87FFFF' ],  // 123
    [ 'rgb300', '#AF0000' ],  // 124
    [ 'rgb301', '#AF005F' ],  // 125
    [ 'rgb302', '#AF0087' ],  // 126
    [ 'rgb303', '#AF00AF' ],  // 127
    [ 'rgb304', '#AF00D7' ],  // 128
    [ 'rgb305', '#AF00FF' ],  // 129
    [ 'rgb310', '#AF5F00' ],  // 130
    [ 'rgb311', '#AF5F5F' ],  // 131
    [ 'rgb312', '#AF5F87' ],  // 132
    [ 'rgb313', '#AF5FAF' ],  // 133
    [ 'rgb314', '#AF5FD7' ],  // 134
    [ 'rgb315', '#AF5FFF' ],  // 135
    [ 'rgb320', '#AF8700' ],  // 136
    [ 'rgb321', '#AF875F' ],  // 137
    [ 'rgb322', '#AF8787' ],  // 138
    [ 'rgb323', '#AF87AF' ],  // 139
    [ 'rgb324', '#AF87D7' ],  // 140
    [ 'rgb325', '#AF87FF' ],  // 141
    [ 'rgb330', '#AFAF00' ],  // 142
    [ 'rgb331', '#AFAF5F' ],  // 143
    [ 'rgb332', '#AFAF87' ],  // 144
    [ 'rgb333', '#AFAFAF' ],  // 145
    [ 'rgb334', '#AFAFD7' ],  // 146
    [ 'rgb335', '#AFAFFF' ],  // 147
    [ 'rgb340', '#AFD700' ],  // 148
    [ 'rgb341', '#AFD75F' ],  // 149
    [ 'rgb342', '#AFD787' ],  // 150
    [ 'rgb343', '#AFD7AF' ],  // 151
    [ 'rgb344', '#AFD7D7' ],  // 152
    [ 'rgb345', '#AFD7FF' ],  // 153
    [ 'rgb350', '#AFFF00' ],  // 154
    [ 'rgb351', '#AFFF5F' ],  // 155
    [ 'rgb352', '#AFFF87' ],  // 156
    [ 'rgb353', '#AFFFAF' ],  // 157
    [ 'rgb354', '#AFFFD7' ],  // 158
    [ 'rgb355', '#AFFFFF' ],  // 159
    [ 'rgb400', '#D70000' ],  // 160
    [ 'rgb401', '#D7005F' ],  // 161
    [ 'rgb402', '#D70087' ],  // 162
    [ 'rgb403', '#D700AF' ],  // 163
    [ 'rgb404', '#D700D7' ],  // 164
    [ 'rgb405', '#D700FF' ],  // 165
    [ 'rgb410', '#D75F00' ],  // 166
    [ 'rgb411', '#D75F5F' ],  // 167
    [ 'rgb412', '#D75F87' ],  // 168
    [ 'rgb413', '#D75FAF' ],  // 169
    [ 'rgb414', '#D75FD7' ],  // 170
    [ 'rgb415', '#D75FFF' ],  // 171
    [ 'rgb420', '#D78700' ],  // 172
    [ 'rgb421', '#D7875F' ],  // 173
    [ 'rgb422', '#D78787' ],  // 174
    [ 'rgb423', '#D787AF' ],  // 175
    [ 'rgb424', '#D787D7' ],  // 176
    [ 'rgb425', '#D787FF' ],  // 177
    [ 'rgb430', '#D7AF00' ],  // 178
    [ 'rgb431', '#D7AF5F' ],  // 179
    [ 'rgb432', '#D7AF87' ],  // 180
    [ 'rgb433', '#D7AFAF' ],  // 181
    [ 'rgb434', '#D7AFD7' ],  // 182
    [ 'rgb435', '#D7AFFF' ],  // 183
    [ 'rgb440', '#D7D700' ],  // 184
    [ 'rgb441', '#D7D75F' ],  // 185
    [ 'rgb442', '#D7D787' ],  // 186
    [ 'rgb443', '#D7D7AF' ],  // 187
    [ 'rgb444', '#D7D7D7' ],  // 188
    [ 'rgb445', '#D7D7FF' ],  // 189
    [ 'rgb450', '#D7FF00' ],  // 190
    [ 'rgb451', '#D7FF5F' ],  // 191
    [ 'rgb452', '#D7FF87' ],  // 192
    [ 'rgb453', '#D7FFAF' ],  // 193
    [ 'rgb454', '#D7FFD7' ],  // 194
    [ 'rgb455', '#D7FFFF' ],  // 195
    [ 'rgb500', '#FF0000' ],  // 196
    [ 'rgb501', '#FF005F' ],  // 197
    [ 'rgb502', '#FF0087' ],  // 198
    [ 'rgb503', '#FF00AF' ],  // 199
    [ 'rgb504', '#FF00D7' ],  // 200
    [ 'rgb505', '#FF00FF' ],  // 201
    [ 'rgb510', '#FF5F00' ],  // 202
    [ 'rgb511', '#FF5F5F' ],  // 203
    [ 'rgb512', '#FF5F87' ],  // 204
    [ 'rgb513', '#FF5FAF' ],  // 205
    [ 'rgb514', '#FF5FD7' ],  // 206
    [ 'rgb515', '#FF5FFF' ],  // 207
    [ 'rgb520', '#FF8700' ],  // 208
    [ 'rgb521', '#FF875F' ],  // 209
    [ 'rgb522', '#FF8787' ],  // 210
    [ 'rgb523', '#FF87AF' ],  // 211
    [ 'rgb524', '#FF87D7' ],  // 212
    [ 'rgb525', '#FF87FF' ],  // 213
    [ 'rgb530', '#FFAF00' ],  // 214
    [ 'rgb531', '#FFAF5F' ],  // 215
    [ 'rgb532', '#FFAF87' ],  // 216
    [ 'rgb533', '#FFAFAF' ],  // 217
    [ 'rgb534', '#FFAFD7' ],  // 218
    [ 'rgb535', '#FFAFFF' ],  // 219
    [ 'rgb540', '#FFD700' ],  // 220
    [ 'rgb541', '#FFD75F' ],  // 221
    [ 'rgb542', '#FFD787' ],  // 222
    [ 'rgb543', '#FFD7AF' ],  // 223
    [ 'rgb544', '#FFD7D7' ],  // 224
    [ 'rgb545', '#FFD7FF' ],  // 225
    [ 'rgb550', '#FFFF00' ],  // 226
    [ 'rgb551', '#FFFF5F' ],  // 227
    [ 'rgb552', '#FFFF87' ],  // 228
    [ 'rgb553', '#FFFFAF' ],  // 229
    [ 'rgb554', '#FFFFD7' ],  // 230
    [ 'rgb555', '#FFFFFF' ],  // 231

    // 24-step grayscale ramp
    [ 'gray0',  '#080808' ],  // 232
    [ 'gray1',  '#121212' ],  // 233
    [ 'gray2',  '#1C1C1C' ],  // 234
    [ 'gray3',  '#262626' ],  // 235
    [ 'gray4',  '#303030' ],  // 236
    [ 'gray5',  '#3A3A3A' ],  // 237
    [ 'gray6',  '#444444' ],  // 238
    [ 'gray7',  '#4E4E4E' ],  // 239
    [ 'gray8',  '#585858' ],  // 240
    [ 'gray9',  '#626262' ],  // 241
    [ 'gray10', '#6C6C6C' ],  // 242
    [ 'gray11', '#767676' ],  // 243
    [ 'gray12', '#808080' ],  // 244
    [ 'gray13', '#8A8A8A' ],  // 245
    [ 'gray14', '#949494' ],  // 246
    [ 'gray15', '#9E9E9E' ],  // 247
    [ 'gray16', '#A8A8A8' ],  // 248
    [ 'gray17', '#B2B2B2' ],  // 249
    [ 'gray18', '#BCBCBC' ],  // 250
    [ 'gray19', '#C6C6C6' ],  // 251
    [ 'gray20', '#D0D0D0' ],  // 252
    [ 'gray21', '#DADADA' ],  // 253
    [ 'gray22', '#E4E4E4' ],  // 254
    [ 'gray23', '#EEEEEE' ]   // 255
];

// probably not needed, but stay safe
McPalette.set_light_mode(false);
McPalette.apply_palette(0);
