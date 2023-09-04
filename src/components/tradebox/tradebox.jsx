import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Spin, Input, Select } from "antd";
// import { cryptoData } from "../../assets/data/data";
import "./tradebox.scss";

export function TradeBox() {
  const [loading, setLoading] = useState(true);
  const [cryptoData, setCryptoData] = useState([]);
  const [orderSide, setOrderSide] = useState("buy");
  const [sourceMarket, setSourceMarket] = useState("تومان");
  const [destinationMarket, setDestinationMarket] = useState("تتر");
  const [activeButton, setActiveButton] = useState("buy");

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://api.temx.org/api/Market")
      .then((response) => {
        if (response.data && response.data.data) {
          const customData = response.data.data.map((crypto) => ({
            label: crypto.symbol + " - " + crypto.name,
            value: crypto.symbol,
          }));
          customData.sort((a, b) => a.order - b.order);
          setCryptoData(customData);
        }
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleOnClick = (newOrderSide) => {
    setOrderSide(newOrderSide);
    setActiveButton(newOrderSide);
  };

  const handleSourceMarketSelect = (crypto) => {
    setSourceMarket(crypto);
    console.log(
      "🚀 ~ file: tradebox.jsx:43 ~ handleSourceMarketSelect ~ crypto:",
      crypto
    );
  };

  const handleDestinationMarketSelect = (crypto) => {
    setDestinationMarket(crypto);
    console.log(
      "🚀 ~ file: tradebox.jsx:48 ~ handleDestinationMarketSelect ~ crypto:",
      crypto
    );
  };

  const renderActionButton = () => {
    switch (activeButton) {
      case "buy":
        return (
          <Button className="buy" id="confirm" onClick={handleBuy}>
            خرید {destinationMarket}{" "}
          </Button>
        );
      case "sell":
        return (
          <Button className="sell" id="confirm" onClick={handleSell}>
            فروش {destinationMarket}{" "}
          </Button>
        );
      case "swap":
        return (
          <Button className="swap" id="confirm" onClick={handleSwap}>
            تبدیل {sourceMarket} به {destinationMarket}{" "}
          </Button>
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
          <Spin spinning={loading}>
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
                  options={cryptoData}
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  style={{ caretColor: "transparent" }}
                  value={sourceMarket}
                  popupMatchSelectWidth
                  dropdownStyle={{ direction: "rtl" }}
                />
              }
            />
          </Spin>
        </div>
        <div className="input-row">
          <div className="label">
            <label>ارز مقصد</label>
          </div>
          <Spin spinning={loading}>
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
                  options={cryptoData}
                  style={{ caretColor: "transparent" }}
                  value={destinationMarket}
                  popupMatchSelectWidth
                  dropdownStyle={{ direction: "rtl" }}
                />
              }
            />
          </Spin>
        </div>
        {renderActionButton()}
      </div>
    </section>
  );
}
