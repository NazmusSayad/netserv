import React from 'react'
import { MdClose } from 'react-icons/md'
import { IconButton, Modal } from '@mui/material'

export default function SimpleModal(props: Props) {
  return (
    <Modal open={props.open} className={'backdrop-blur-sm'}>
      <div className={'h-full flex'} onClick={props.close}>
        <div
          className={$tw(
            'bg-zinc-800 shadow-zinc-400 transition-all m-auto grid auto-rows-[auto_1fr]',
            props.containerClassName
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className={
              'flex justify-between py-2 px-4 border-b border-stone-600 items-center'
            }
          >
            <div>{props.header}</div>

            <div>
              <IconButton onClick={props.close}>
                <MdClose />
              </IconButton>
            </div>
          </div>

          <div className={'p-4 pt-2 overflow-auto'}>{props.children}</div>
        </div>
      </div>
    </Modal>
  )
}

type Props = {
  open: boolean
  children: React.ReactElement | string | React.ReactElement[]
  header?: React.ReactElement | string | React.ReactElement[]
  close?: () => void
  containerClassName?: any
}
