import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant } from 'custom-card-helpers';

interface RemiCardConfig {
  type: string;
  device_id: string;
  device_name?: string;
  title?: string;
  show_controls?: boolean;
  show_face_selector?: boolean;
  show_temperature_graph?: boolean;
  show_connectivity?: boolean;
  hours_to_show?: number;
}

@customElement('remi-card-editor')
export class RemiCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: RemiCardConfig;

  public setConfig(config: RemiCardConfig): void {
    this._config = config;
  }

  private _valueChanged(ev: CustomEvent): void {
    if (!this._config || !this.hass) {
      return;
    }

    const target = ev.target as any;
    const value = target.value;

    if (target.configValue) {
      const newConfig = {
        ...this._config,
        [target.configValue]: target.checked !== undefined ? target.checked : value,
      };

      const event = new CustomEvent('config-changed', {
        detail: { config: newConfig },
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(event);
    }
  }

  protected render(): TemplateResult {
    if (!this.hass || !this._config) {
      return html``;
    }

    return html`
      <div class="card-config">
        <div class="option">
          <ha-textfield
            label="Device ID (e.g., garance)"
            .value=${this._config.device_id || ''}
            .configValue=${'device_id'}
            @input=${this._valueChanged}
          ></ha-textfield>
        </div>

        <div class="option">
          <ha-textfield
            label="Device Name (optional)"
            .value=${this._config.device_name || ''}
            .configValue=${'device_name'}
            @input=${this._valueChanged}
          ></ha-textfield>
        </div>

        <div class="option">
          <ha-formfield label="Show face selector">
            <ha-switch
              .checked=${this._config.show_face_selector !== false}
              .configValue=${'show_face_selector'}
              @change=${this._valueChanged}
            ></ha-switch>
          </ha-formfield>
        </div>

        <div class="option">
          <ha-formfield label="Show light controls">
            <ha-switch
              .checked=${this._config.show_controls !== false}
              .configValue=${'show_controls'}
              @change=${this._valueChanged}
            ></ha-switch>
          </ha-formfield>
        </div>

        <div class="option">
          <ha-formfield label="Show temperature graph">
            <ha-switch
              .checked=${this._config.show_temperature_graph !== false}
              .configValue=${'show_temperature_graph'}
              @change=${this._valueChanged}
            ></ha-switch>
          </ha-formfield>
        </div>

        <div class="option">
          <ha-formfield label="Show connectivity">
            <ha-switch
              .checked=${this._config.show_connectivity !== false}
              .configValue=${'show_connectivity'}
              @change=${this._valueChanged}
            ></ha-switch>
          </ha-formfield>
        </div>

        <div class="option">
          <ha-textfield
            label="Hours to show in graph"
            type="number"
            .value=${this._config.hours_to_show || 24}
            .configValue=${'hours_to_show'}
            @input=${this._valueChanged}
          ></ha-textfield>
        </div>
      </div>
    `;
  }

  static get styles() {
    return css`
      .card-config {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .option {
        display: flex;
        flex-direction: column;
      }

      ha-textfield {
        width: 100%;
      }

      ha-formfield {
        display: flex;
        align-items: center;
        padding: 8px 0;
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'remi-card-editor': RemiCardEditor;
  }
}
