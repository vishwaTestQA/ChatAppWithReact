import React from 'react'
import { useCustomThemeStore } from '../store/useCustomThemeStore'

export const CustomThemePage = () => {
  // BG_COLOR_DARK: #00000061;
  // BG_COLOR_RETRO: #d2cc6fc6;
  // BG_COLOR_coffe: #73700a55;
  // BG_COLOR_SILVER: #e6ddddd2;
  // BG_COLOR_SMOKE: whitesmoke;

  // TEXT_COLOR_DARK: #333;
  // TEXT_COLOR_SMOKE: whitesmoke;

  /* dark;['#c08df0','plum','lightgreen', '#333'] */
/* light:['blueviolet', 'purple','aquamarine', '#333'] */
/* cofee:['lightcoral','#083f08ac', '#226f5aac','#333'] */
/* wireframe:['grey','grey','grey','#dedddd'] */
/* corporate:['#6f6ff3','#70878f','#008073','#111'] */
/* retro:['plum','#77ece0a6','#915f02','#370e0e']*/

const {customTheme, setCustomTheme} = useCustomThemeStore()

  const customThemeObj = {
    dark: {
      appColor:['#01011e', 'whitesmoke'],
      paletteColor:['#c08df0','plum','lightgreen', '#333']
    }, 
    retro: {
      appColor:['#d2cc6fc6', '#333'],
      paletteColor: ['plum','#77ece0a6','#915f02','#370e0e']
    },
    coffee: {
      appColor: ['#73700a55', '#f0e08796'],
      paletteColor: ['lightcoral','#083f08ac', '#226f5aac','#333'] 
    },
    wireframe: {
      appColor: ['#ffffffe3', '#000'],
      paletteColor: ['grey','grey','grey','#dedddd'] 
    },
    corporate: {
      appColor: ['#ffffffe3', '#00000061'],
      paletteColor: ['#6f6ff3','#70878f','#008073','#111']
    },
    black: {
      appColor:['black', 'white'],
      // paletteColor: ['#370e0e','#370e0e','#370e0e','#370e0e']
      paletteColor: ['#000','#000','#000','#000']
    }
  }

  return (
    <div className='h-screen '>
      <div className='flex flex-col'>
        <p>Theme</p>
        <p>click themes from the below options</p>
      </div>

      <div className='grid grid-cols-4 sm:grid-rows-6 md:grid-rows-8 gap-3 overflow-hidden'>
        {
          Object.entries(customThemeObj).map(([k, v]) => (
            <button key={k}
                    onClick={()=> setCustomTheme({bgColor:v.appColor[0], textColor:v.appColor[1]})}
                    className='w-16'
            >
            <div className='flex-col'>
              <div className='flex'>
                {
                  v.paletteColor.map(p=>(
                    // <div className={`w-full h-7 bg-[${p}]`}></div>
                    <div className={`w-full h-8 rounded-lg`} style={{backgroundColor: p}}></div>
                  ))
                }
              </div>
            </div>
            <div>{k}</div>
            </button>
          ))
        }
      </div>
    </div>
  )
}
