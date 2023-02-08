import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { IonPopoverComponent } from '../projects/ion/src/lib/popover/popover.component';
import { InputComponent } from '../projects/ion/src/lib/input/input.component';

import {
  AlertComponent,
  BadgeComponent,
  ButtonComponent,
  DropdownComponent,
  IonDividerComponent,
  IonIconComponent,
} from '../projects/ion/src/public-api';
import { PopoverPosition } from '../projects/ion/src/lib/core/types/popover';

export default {
  title: 'Ion/Data Display/Popover',
  component: IonPopoverComponent,
} as Meta;

const Template: Story<IonPopoverComponent> = (args: IonPopoverComponent) => ({
  component: IonPopoverComponent,
  props: args,
  moduleMetadata: {
    declarations: [
      IonDividerComponent,
      ButtonComponent,
      IonIconComponent,
      BadgeComponent,
      DropdownComponent,
      AlertComponent,
      InputComponent,
    ],
    imports: [CommonModule, FormsModule],
  },
});

export const Default = Template.bind({});
Default.args = {
  ionPopoverTitle: 'Você tem certeza?',
  ionPopoverBody:
    'Ao concluir essa ação as ordens de serviço alocadas para o recurso ficarão órfãs.',
  ionPopoverIcon: 'left2',
  ionPopoverIconClose: true,
  ionPopoverPosition: PopoverPosition.DEFAULT,
  ionPopoverActions: null,
};

export const withActions = Template.bind({});
withActions.args = {
  ionPopoverTitle: 'Você tem certeza?',
  ionPopoverBody:
    'Ao concluir essa ação as ordens de serviço alocadas para o recurso ficarão órfãs.',
  ionPopoverIcon: 'condominium',
  ionPopoverIconClose: true,
  ionPopoverActions: [{ label: 'action 1' }, { label: 'action 2' }],
  ionPopoverPosition: PopoverPosition.DEFAULT,
};