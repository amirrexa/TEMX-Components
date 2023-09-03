import React, { useState } from "react";
import { Button, Spin, Input, Select } from "antd";
import { cryptoData } from "../../assets/data/data";
import "./tradebox.scss";

export function TradeBox() {
  const [orderSide, setOrderSide] = useState("buy");
  const [sourceMarket, setSourceMarket] = useState("تومان");
  const [destinationMarket, setDestinationMarket] = useState("تتر");
  const [activeButton, setActiveButton] = useState("buy");

  const handleOnClick = (newOrderSide) => {
    setOrderSide(newOrderSide);
    setActiveButton(newOrderSide);
  };

  const handleSourceMarketSelect = (crypto) => {
    setSourceMarket(crypto)
  };

  const handleDestinationMarketSelect = (crypto) => {
    setDestinationMarket(crypto);
  };

  const renderActionButton = () => {
    switch (activeButton) {
      case "buy":
        return (
          <Button className="buy" id="confirm" onClick={handleBuy}>
خرید {destinationMarket}          </Button>
        );
      case "sell":
        return (
          <Button className="sell" id="confirm" onClick={handleSell}>
فروش {destinationMarket}          </Button>
        );
      case "swap":
        return (
          <Button className="swap" id="confirm" onClick={handleSwap}>
تبدیل {sourceMarket} به {destinationMarket}          </Button>
        );
      default:
        return null;
    }
  };

  const handleBuy = () => {
    console.log("دکمه ی خرید");
  };

  const handleSell = () => {
    console.log("دکمه ی فروش");
  };

  const handleSwap = () => {
    console.log("دکمه ی تبدیل");
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
            فروش{" "}
          </Button>
          <Button
            onClick={() => handleOnClick("swap")}
            className={activeButton === "swap" ? "active" : ""}
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
                onChange={handleSourceMarketSelect}
                filterOption={(input, option) =>
                  (option.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={cryptoData.map((crypto) => ({
                  label: `${crypto.en} - ${crypto.fa}`,
                  value: crypto.fa,
                  crypto: crypto,
                }))}
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                style={{ caretColor: "transparent" }}
                value={sourceMarket}
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
                onChange={handleDestinationMarketSelect}
                filterOption={(input, option) =>
                  (option.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={cryptoData.map((crypto) => ({
                  label: `${crypto.en} - ${crypto.fa}`,
                  value: crypto.fa,
                }))}
                style={{ caretColor: "transparent" }}
                value={destinationMarket}
              />
            }
          />
        </div>
        {renderActionButton()}
      </div>
    </section>
  );
}
