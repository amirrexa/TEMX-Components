import React, { useState } from "react";
import { Button, Spin, Input, Select } from "antd";
import { cryptoData } from "../../assets/data/data";
import "./tradebox.scss";

export function TradeBox() {
  const [orderSide, setOrderSide] = useState("buy");
  const [activeButton, setActiveButton] = useState("buy");

  const handleOnClick = (newOrderSide) => {
    setOrderSide(newOrderSide);
    setActiveButton(newOrderSide);
  };

  const onChange = (value) => {
    console.log(`Selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("Search:", value);
  };

  return (
    <section className="temx-tradebox">
      <div className="content">
        <div className="side-selection">
          <Button
            onClick={() => handleOnClick("buy")}
            className={activeButton === "buy" ? "active" : ""}
          >
            {" "}
            خرید{" "}
          </Button>
          <Button
            onClick={() => handleOnClick("sell")}
            className={activeButton === "sell" ? "active" : ""}
          >
            {" "}
            فروش{" "}
          </Button>
          <Button
            onClick={() => handleOnClick("converse")}
            className={activeButton === "converse" ? "active" : ""}
          >
            {" "}
            تبدیل{" "}
          </Button>
        </div>
        <div className="input-row">
          <div className="label">
            <label>ارز مبداء</label>
          </div>
          <Input
            addonBefore="واحد"
            addonAfter={
              <Select
                showSearch
                placeholder="انتخاب ارز"
                optionFilterProp="children"
                onChange={onChange}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={cryptoData}
              />
            }
          />
        </div>

        <div className="input-row">
          <div className="label">
            <label>ارز مقصد</label>
          </div>
          <Input
            addonBefore="واحد"
            addonAfter={
              <Select
                showSearch
                placeholder="انتخاب ارز"
                optionFilterProp="children"
                onChange={onChange}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={cryptoData}
              />
            }
          />
        </div>

<Button className="" ></Button>
      </div>
    </section>
  );
}
